import React, { useEffect, useState } from 'react';
import styles from './LocationEntry.module.css';
import { ILocation } from '../../../../../shared/types/entry';

interface LocationEntryProps {
  entry: ILocation;
  handleEntryClick: (entryId: string) => void;
}

const LocationEntry: React.FC<LocationEntryProps> = ({
  entry,
  handleEntryClick,
}) => {
  return (
    <div className={styles.LocationEntry}>
      <h4>Category: {entry.locationType}</h4>
    </div>
  );
};

export default LocationEntry;
