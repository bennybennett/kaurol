import React from 'react';
import { ICharacter } from '../../../../../shared/types/entry';

interface AddRelationshipFormProps {
  onSubmit: (relatedCharacter: string, relationshipType: string) => void;
  characterList: ICharacter[];
}

const AddRelationshipForm: React.FC<AddRelationshipFormProps> = ({
  onSubmit,
  characterList,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const relatedCharacter = (event.target as any).relatedCharacter.value;
    const relationshipType = (event.target as any).relationshipType.value;
    onSubmit(relatedCharacter, relationshipType);
  };

  return (
    <div className='add-relationship-form'>
      <h3>Add Relationship</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='relatedCharacter'>Related Character</label>
        <select name='relatedCharacter'>
          {characterList.map((relation) => {
            return (
              <option key={relation._id} value={relation._id}>
                {relation.title}
              </option>
            );
          })}
        </select>
        <label htmlFor='relationshipType'>Relationship</label>
        <input type='text' name='relationshipType' />
        <button type='submit'>Add Relationship</button>
      </form>
    </div>
  );
};

export default AddRelationshipForm;
