import React, { useState, useEffect } from 'react';
import { ICharacter } from '../../../../../shared/types/entry';
import Link from '../../shared/Link/Link';

interface CharacterRelationship {
  _id?: string;
  description: string;
  relationName: string;
  relationId: string;
}

interface CharacterRelationshipsProps {
  character: ICharacter;
  characterList: ICharacter[];
  handleEntryClick: (entryId: string) => void;
}

const CharacterRelationships: React.FC<CharacterRelationshipsProps> = ({
  character,
  characterList,
  handleEntryClick,
}) => {
  const [relationships, setRelationships] = useState<CharacterRelationship[]>(
    []
  );

  useEffect(() => {
    const fetchedRelationships = character.relationships.map((relationship) => {
      const relatedCharacter = characterList.find(
        (char) => char._id === relationship.relatedCharacter
      );
      return {
        _id: relationship._id,
        description: relationship.relationshipType,
        relationName: relatedCharacter?.title || '',
        relationId: relationship.relatedCharacter,
      };
    });

    setRelationships(fetchedRelationships);
  }, [characterList, character]);

  return (
    <div>
      <h3>Relationships</h3>
      {relationships.map((relationship) => (
        <div key={relationship._id}>
          <div className='relationship'>
            <Link
              callback={() => handleEntryClick(relationship.relationId)}
              text={relationship.relationName}
            />{' '}
            - {relationship.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterRelationships;
