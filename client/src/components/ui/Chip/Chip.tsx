import React from 'react';
import { generateColor } from '../../../util/color';
import styles from './Chip.module.css';

interface ChipProps {
  children: string;
}

const Chip: React.FC<ChipProps> = ({ children }) => {
  const chipStyle = generateColor(children);

  return (
    <span className={styles.Chip} style={chipStyle}>
      <strong>{children}</strong>
    </span>
  );
};

export default Chip;
