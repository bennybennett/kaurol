import React from 'react';
import styles from './EntryTypeLabel.module.css';

interface EntryTypeLabelProps {
  letter: string;
  className?: string;
}

const EntryTypeLabel: React.FC<EntryTypeLabelProps> = ({
  letter,
  className,
}) => {
  return (
    <div className={`${styles.EntryTypeLabel} ${className || ''}`}>
      {letter}
    </div>
  );
};

export default EntryTypeLabel;
