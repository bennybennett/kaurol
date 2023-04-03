import React, { useState } from 'react';
import styles from './CreateCharacter.module.css';
import { createCharacter } from '../../../api/characters';
import { ICharacter } from '../../../../../shared/types/entry';

interface CreateCharacterProps {}

const CreateCharacter: React.FC<CreateCharacterProps> = ({}) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createCharacter({ title, description } as ICharacter);

    setTitle('');
    setDescription('');
  };

  return (
    <div className={styles.CreateCharacter}>
      <h1>Create Character</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          name='title'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <label htmlFor='description'>Description:</label>
        <textarea
          id='description'
          name='description'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <br />
        <button type='submit'>Create Character</button>
      </form>
    </div>
  );
};

export default CreateCharacter;
