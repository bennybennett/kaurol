import React, { useState, useEffect } from 'react';
import { ICharacter } from '../../../../../shared/types/entry';
import CharacterRelationships from './CharacterRelationships';
import AddRelationshipForm from '../AddRelationshipForm/AddRelationshipForm';
import {
  getAllCharacters,
  addCharacterRelationship,
} from '../../../api/characters';
import { StageEntryMode } from '../StageEntry/StageEntry';
import styles from './CharacterEntry.module.css';

interface CharacterEntryProps {
  character: ICharacter;
  mode: StageEntryMode;
  setModeBackToDefault: () => void;
}

const CharacterEntry: React.FC<CharacterEntryProps> = ({
  character,
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

        const updatedCharacter = characters.find(
          (char) => char._id === character._id
        );
        if (updatedCharacter) {
          setStagedCharacter(updatedCharacter);
        }
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

  const filterCharacterList = () =>
    characterList.filter((char) => {
      return (
        char._id !== stagedCharacter._id &&
        !stagedCharacter.relationships.some(
          (rel) => rel.relatedCharacter === char._id
        )
      );
    });

  return (
    <div className={styles.CharacterEntry}>
      {mode === StageEntryMode.View &&
        stagedCharacter.relationships.length > 0 && (
          <CharacterRelationships
            character={stagedCharacter}
            characterList={characterList}
          />
        )}
      {mode === StageEntryMode.View && (
        <AddRelationshipForm
          onSubmit={handleSubmitAddRelationship}
          characterList={filterCharacterList()}
        />
      )}
    </div>
  );
};

export default CharacterEntry;
