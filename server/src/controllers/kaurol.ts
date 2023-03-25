import { Request, Response } from 'express';
import { CharacterModel } from '../models/Entry';
import { ICharacter } from '../../../shared/types/entry';
import {
  ISuggestion,
  IOneSidedRelationshipSuggestion,
  IAddMoreRelationshipsSuggestion,
} from '../../../shared/types/kaurol';
import { v4 as uuidv4 } from 'uuid';
import nspell from 'nspell';
import * as fs from 'fs';
import * as path from 'path';

const getAddMoreRelationshipsSuggestions = async () => {
  // Character Relationship count
  const characterRelationshipCount = await CharacterModel.aggregate([
    {
      $lookup: {
        from: 'characters',
        localField: 'relationships.relatedCharacter',
        foreignField: '_id',
        as: 'incomingRelationships',
      },
    },
    {
      $project: {
        title: 1,
        outgoingRelationships: { $size: '$relationships' },
        incomingRelationships: { $size: '$incomingRelationships' },
      },
    },
  ]);

  // Find character with the fewest relationships
  let minRelationships = Infinity;
  const charactersWithFewestRelationships: Array<{
    title: string;
    _id: string;
    outgoingRelationships: number;
    incomingRelationships: number;
  }> = [];

  characterRelationshipCount.forEach((char) => {
    const relationships =
      char.outgoingRelationships + char.incomingRelationships;
    if (relationships < minRelationships) {
      minRelationships = relationships;
      charactersWithFewestRelationships.splice(
        0,
        charactersWithFewestRelationships.length,
        char
      );
    } else if (relationships === minRelationships) {
      charactersWithFewestRelationships.push(char);
    }
  });

  const randomIndexFewestRelationships = Math.floor(
    Math.random() * charactersWithFewestRelationships.length
  );
  const selectedCharacter =
    charactersWithFewestRelationships[randomIndexFewestRelationships];

  const addMoreRelationshipsSuggestion: IAddMoreRelationshipsSuggestion = {
    message: `Character ${selectedCharacter.title} has very few relationships. Try adding more relationships to this character.`,
    character: {
      name: selectedCharacter.title,
      id: selectedCharacter._id,
      outgoingRelationships: selectedCharacter.outgoingRelationships,
      incomingRelationships: selectedCharacter.incomingRelationships,
    },
    type: 'AddMoreRelationshipsSuggestion',
    _id: uuidv4(),
  };

  return addMoreRelationshipsSuggestion;
};

const getOneSidedRelationshipSuggestions = async (characters: ICharacter[]) => {
  const oneSidedRelationships = [];

  for (const character of characters) {
    for (const relationship of character.relationships) {
      const relatedCharacter = characters.find(
        (c) => c._id.toString() === relationship.relatedCharacter.toString()
      );

      if (relatedCharacter) {
        const reverseRelationship = relatedCharacter.relationships.find(
          (r) => r.relatedCharacter.toString() === character._id.toString()
        );

        if (!reverseRelationship) {
          oneSidedRelationships.push({
            fromCharacter: { name: character.title, id: character._id },
            toCharacter: {
              name: relatedCharacter.title,
              id: relatedCharacter._id,
            },
            relationshipType: relationship.relationshipType,
          });
        }
      }
    }
  }

  const randomIndexOneSidedRelationships = Math.floor(
    Math.random() * oneSidedRelationships.length
  );

  const randomRelationship =
    oneSidedRelationships[randomIndexOneSidedRelationships];

  const oneSidedRelationshipSuggestion: IOneSidedRelationshipSuggestion = {
    message: `One-sided relationship between ${randomRelationship.fromCharacter.name} and ${randomRelationship.toCharacter.name}. Try adding a relationship from ${randomRelationship.toCharacter.name} to ${randomRelationship.fromCharacter.name}.`,
    fromCharacter: {
      name: randomRelationship.fromCharacter.name,
      id: randomRelationship.fromCharacter.id,
    },
    toCharacter: {
      name: randomRelationship.toCharacter.name,
      id: randomRelationship.toCharacter.id,
    },
    relationshipType: randomRelationship.relationshipType,
    type: 'OneSidedRelationshipSuggestion',
    _id: uuidv4(),
  };

  return oneSidedRelationshipSuggestion;
};

export const getNextSuggestion = async (req: Request, res: Response) => {
  try {
    // Get all characters
    const characters = await CharacterModel.find({});

    // Return suggestion list
    const suggestions: ISuggestion[] = [];

    // "Add More Relationships" Suggestion
    const addMoreRelationshipsSuggestion =
      await getAddMoreRelationshipsSuggestions();

    suggestions.push(addMoreRelationshipsSuggestion as ISuggestion);

    // Calculate one-sided relationships
    const oneSidedRelationshipSuggestion =
      await getOneSidedRelationshipSuggestions(characters);

    suggestions.push(oneSidedRelationshipSuggestion as ISuggestion);

    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getUnfamiliarWords = async (req: Request, res: Response) => {
  try {
    const DICT_PATH = path.join(__dirname, '../..');

    const affixBuffer = fs.readFileSync(path.join(DICT_PATH, 'en.aff'));
    const dictionaryBuffer = fs.readFileSync(path.join(DICT_PATH, 'en.dic'));

    const affix = affixBuffer.toString();
    const dictionary = dictionaryBuffer.toString();

    const spellchecker = nspell(affix, dictionary);

    function findUnfamiliarWords(text: string): Set<string> {
      const words = text.match(/\b\w+\b/g);
      const unfamiliarWordsSet: Set<string> = new Set();
      let currentPhrase: string[] = [];

      if (words) {
        words.forEach((word, index) => {
          if (!spellchecker.correct(word)) {
            currentPhrase.push(word);
          } else {
            if (currentPhrase.length > 0) {
              currentPhrase.forEach((unfamiliarWord) => {
                unfamiliarWordsSet.add(unfamiliarWord);
              });
              currentPhrase = [];
            }
          }

          if (index === words.length - 1 && currentPhrase.length > 0) {
            currentPhrase.forEach((unfamiliarWord) => {
              unfamiliarWordsSet.add(unfamiliarWord);
            });
          }
        });
      }

      return unfamiliarWordsSet;
    }

    // Let's look through all descriptions of all characters
    const characters = await CharacterModel.find().exec();
    let allDescriptions = '';
    const allTitles = characters.map((character) => character.title);

    characters.forEach((character) => {
      allDescriptions += character.description + ' ';
    });

    // Here are the unfamiliar words that could become new entries, with invalid words filtered out
    const result = Array.from(findUnfamiliarWords(allDescriptions)).filter(
      (str) =>
        !/^\s*$/.test(str) && !/^\d+$/.test(str) && !allTitles.includes(str)
    );

    console.log('Unfamiliar words:', result);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};
