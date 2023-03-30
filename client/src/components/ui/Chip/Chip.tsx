import React from 'react';
import { generateColor } from '../../../util/color';
import styles from './Chip.module.css';

interface ChipProps {
  text: string;
}

const Chip: React.FC<ChipProps> = ({ text }) => {
  const chipStyle = generateColor(text);

  return (
    <span className={styles.Chip} style={chipStyle}>
      {text}
    </span>
  );
};

export default Chip;
