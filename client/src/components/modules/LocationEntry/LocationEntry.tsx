import React, { useContext, useEffect, useState } from 'react';
import styles from './LocationEntry.module.css';
import { ILocation } from '../../../../../shared/types/entry';
import { LocationsContext } from '../../contexts/LocationsContext/LocationsContext';
import Chip from '../../ui/Chip/Chip';
import Link from '../../shared/Link/Link';

interface LocationEntryProps {
  entry: ILocation;
}

const LocationEntry: React.FC<LocationEntryProps> = ({ entry }) => {
  const locations = useContext(LocationsContext);
  const location = locations.find((location) => location._id === entry._id);

  if (!location) {
    return <h1>Location not found!</h1>;
  }

  function isILocation(obj: any): obj is ILocation {
    return obj && typeof obj.title === 'string';
  }

  return (
    <div className={styles.LocationEntry}>
      <div>
        Category: <Chip>{entry.locationType}</Chip>
      </div>
      {isILocation(location.parent) && (
        <div>
          Parent:{' '}
          <Link href={`/entries/${location.parent._id}`}>
            {location.parent.title}
          </Link>
        </div>
      )}
    </div>
  );
};

export default LocationEntry;
