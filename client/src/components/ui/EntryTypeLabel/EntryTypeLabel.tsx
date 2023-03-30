import React from 'react';
import { generateColor } from '../../../util/color';
import styles from './EntryTypeLabel.module.css';

interface EntryTypeLabelProps {
  letter: string;
  seedText?: string;
}

const EntryTypeLabel: React.FC<EntryTypeLabelProps> = ({
  letter,
  seedText,
}) => {
  const chipStyle = generateColor(seedText || letter);

  return (
    <div className={`${styles.EntryTypeLabel}`} style={chipStyle}>
      {letter}
    </div>
  );
};

export default EntryTypeLabel;
