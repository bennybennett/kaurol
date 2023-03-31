import React, { useContext } from 'react';
import styles from './LocationEntry.module.css';
import { ILocation } from '../../../../../shared/types/entry';
import { LocationsContext } from '../../contexts/LocationsContext/LocationsContext';

interface LocationEntryProps {
  entry: ILocation;
}

const LocationEntry: React.FC<LocationEntryProps> = ({ entry }) => {
  const locations = useContext(LocationsContext);

  console.log(locations);

  return (
    <div className={styles.LocationEntry}>
      <h4>Category: {entry.locationType}</h4>
    </div>
  );
};

export default LocationEntry;
