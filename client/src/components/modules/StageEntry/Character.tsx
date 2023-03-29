import React, { useState, useEffect } from 'react';
import { ICharacter } from '../../../../../shared/types/entry';
import CharacterRelationships from './CharacterRelationships';
import AddRelationshipForm from '../AddRelationshipForm/AddRelationshipForm';
import {
  getAllCharacters,
  addCharacterRelationship,
} from '../../../api/characters';
import EntryLinkText from '../../EntryLinkText';
import { StageEntryMode } from './StageEntry';

interface CharacterProps {
  character: ICharacter;
  handleEntryClick: (entryId: string) => void;
  mode: StageEntryMode;
  setModeBackToDefault: () => void;
}

const Character: React.FC<CharacterProps> = ({
  character,
  handleEntryClick,
  mode,
  setModeBackToDefault,
}) => {
  const [stagedCharacter, setStagedCharacter] = useState<ICharacter>(character);
  const [characterList, setCharacterList] = useState<ICharacter[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const characters = await getAllCharacters();
        setCharacterList(characters);

        // Update the current character, or set it to the original character if it's not in the list for some reason
        setStagedCharacter(
          characters.find((char) => char._id === character._id) || character
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacters();
  }, [mode, character]);

  const handleSubmitAddRelationship = async (
    relatedCharacter: string,
    relationshipType: string
  ) => {
    try {
      await addCharacterRelationship(
        stagedCharacter._id as string,
        relatedCharacter,
        relationshipType
      );

      setModeBackToDefault();
    } catch (error) {
      console.error(error);
    }
  };

  const filterCharacterList = () => {
    return characterList.filter((char) => {
      // Check if the current character is not the staged character
      if (char._id !== stagedCharacter._id) {
        // Check if the current character's _id is not in the staged character's relationship list
        const isNotRelated = !stagedCharacter.relationships.some(
          (rel) => rel.relatedCharacter === char._id
        );
        return isNotRelated;
      }
      return false;
    });
  };

  return (
    <div>
      {mode === StageEntryMode.Link ? (
        <EntryLinkText text={stagedCharacter.description} />
      ) : (
        <p>{stagedCharacter.description}</p>
      )}

      <div>
        <h3>Personality</h3>
        <p>{stagedCharacter.personality}</p>
      </div>

      {mode === StageEntryMode.View &&
        stagedCharacter.relationships.length > 0 && (
          <CharacterRelationships
            handleEntryClick={handleEntryClick}
            character={stagedCharacter}
            characterList={characterList}
          />
        )}
      {mode === StageEntryMode.AddRelationship && (
        <AddRelationshipForm
          onSubmit={(relatedCharacter, relationshipType) =>
            handleSubmitAddRelationship(relatedCharacter, relationshipType)
          }
          characterList={filterCharacterList()}
        />
      )}
    </div>
  );
};

export default Character;
