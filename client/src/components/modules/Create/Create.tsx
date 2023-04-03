import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Create.module.css';
import CreateCharacter from '../../forms/CreateCharacter/CreateCharacter';
// import CreateLocation from '../../forms/CreateLocation/CreateLocation';

interface CreateProps {}

const Create: React.FC<CreateProps> = ({}) => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const type = params.get('type');

  if (type === 'Character') {
    return <CreateCharacter />;
  } else if (type === 'Location') {
    // return <CreateLocation />;
    return null;
  } else {
    return <div className={styles.Create}>Invalid type parameter.</div>;
  }
};

export default Create;
