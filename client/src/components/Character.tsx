import React, { useState, useEffect } from 'react';
import { ICharacter } from '../../../shared/types/entry';
import CharacterRelationships from './CharacterRelationships';
import AddRelationshipForm from './AddRelationshipForm';
import { getAllCharacters, addCharacterRelationship } from '../api/characters';
import EntryLinkText from './EntryLinkText';
import Button from './ui/Button/Button';

interface CharacterProps {
  character: ICharacter;
  handleEntryClick: (entryId: string) => void;
}

enum CharacterStageMode {
  View = 'view',
  Edit = 'edit',
  AddRelationship = 'add-relationship',
  Link = 'link',
  Delete = 'delete',
}

const Character: React.FC<CharacterProps> = ({
  character,
  handleEntryClick,
}) => {
  const [stagedCharacter, setStagedCharacter] = useState<ICharacter>(character);
  const [mode, setMode] = useState<CharacterStageMode>(CharacterStageMode.View);
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

      setMode(CharacterStageMode.View);
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
    <div
      className={mode === 'view' ? 'character' : `character character--${mode}`}
    >
      <h2>{stagedCharacter.title}</h2>
      <small>{mode !== CharacterStageMode.View && `Mode: ${mode}`}</small>

      {mode === CharacterStageMode.Link ? (
        <EntryLinkText text={stagedCharacter.description} />
      ) : (
        <p>{stagedCharacter.description}</p>
      )}

      {mode === CharacterStageMode.View && (
        <div>
          <h3>Personality</h3>
          <p>{stagedCharacter.personality}</p>
        </div>
      )}

      {mode === CharacterStageMode.View &&
        stagedCharacter.relationships.length > 0 && (
          <CharacterRelationships
            handleEntryClick={handleEntryClick}
            character={stagedCharacter}
            characterList={characterList}
          />
        )}
      {mode === CharacterStageMode.AddRelationship && (
        <AddRelationshipForm
          onSubmit={(relatedCharacter, relationshipType) =>
            handleSubmitAddRelationship(relatedCharacter, relationshipType)
          }
          characterList={filterCharacterList()}
        />
      )}
      <div className='buttons'>
        {mode !== CharacterStageMode.View ? (
          <Button
            callback={() => setMode(CharacterStageMode.View)}
            text='Back'
          />
        ) : (
          <div>
            <Button
              callback={() => setMode(CharacterStageMode.AddRelationship)}
              text='Add Relationship'
            />
            <Button
              callback={() => setMode(CharacterStageMode.Link)}
              text='Link'
            />
            <Button
              callback={() => setMode(CharacterStageMode.Edit)}
              text='Edit'
            />
            <Button
              callback={() => setMode(CharacterStageMode.Delete)}
              text='Delete'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Character;
