import React from 'react';
import styles from './EntryTypeLabel.module.css';

interface EntryTypeLabelProps {
  letter: string;
}

const EntryTypeLabel: React.FC<EntryTypeLabelProps> = ({ letter }) => {
  let typeClass = '';
  if (letter === 'C') {
    typeClass = styles.typeC;
  } else if (letter === 'L') {
    typeClass = styles.typeL;
  } else {
    typeClass = styles.defaultType;
  }

  return (
    <div className={`${styles.EntryTypeLabel} ${typeClass}`}>{letter}</div>
  );
};

export default EntryTypeLabel;
