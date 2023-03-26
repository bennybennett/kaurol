import React from 'react';
import styles from './Location.module.css';
import { ILocation } from '../../../../../shared/types/entry';

interface LocationProps {
  entry: ILocation;
  handleEntryClick: (entryId: string) => void;
}

const Location: React.FC<LocationProps> = ({ entry, handleEntryClick }) => {
  return (
    <div className={styles.Location}>
      <h4>Category: {entry.locationType}</h4>
      <p>{entry.description}</p>
    </div>
  );
};

export default Location;
