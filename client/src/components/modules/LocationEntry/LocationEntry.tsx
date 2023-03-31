import React, { useContext } from 'react';
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

  const generateLineage = (
    loc: ILocation,
    lineage: ILocation[] = []
  ): ILocation[] => {
    console.log(loc);
    if (!isILocation(loc.parent)) {
      return lineage;
    }

    const parent = locations.find(
      (location) => isILocation(loc.parent) && location._id === loc.parent._id
    );
    console.log(locations);
    if (!parent) {
      return lineage;
    }

    lineage.unshift(parent);
    return generateLineage(parent, lineage);
  };

  const lineage = generateLineage(location);

  return (
    <div className={styles.LocationEntry}>
      <div className={styles['location-category']}>
        Category: <Chip>{entry.locationType}</Chip>
      </div>
      {(lineage.length > 0 || location.sublocations?.length) && (
        <table className={styles['lineage-table']}>
          {lineage.length > 0 &&
            lineage.map((loc) => (
              <tr key={loc._id}>
                <td>
                  <Link href={`/entries/${loc._id}`}>{loc.title}</Link>
                </td>
                <td>
                  <small>{loc.title}'s Sub-Locations</small>
                  <br />
                  {loc.sublocations?.map((subloc, subIndex) => (
                    <React.Fragment key={subloc._id}>
                      {subIndex > 0 && <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>}
                      {subloc._id === entry._id ? (
                        <span className={styles['current-location']}>
                          {subloc.title}
                        </span>
                      ) : (
                        <Link href={`/entries/${subloc._id}`}>
                          {subloc.title}
                        </Link>
                      )}
                    </React.Fragment>
                  ))}
                </td>
              </tr>
            ))}
          {location.sublocations && location.sublocations.length > 0 && (
            <tr>
              <td colSpan={2}>
                <small>{location.title}'s Sub-Locations</small>
                <br />
                {location.sublocations?.map((subloc, subIndex) => (
                  <React.Fragment key={subloc._id}>
                    {subIndex > 0 && <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>}
                    {subloc._id === entry._id ? (
                      <span className={styles['current-location']}>
                        {subloc.title}
                      </span>
                    ) : (
                      <Link href={`/entries/${subloc._id}`}>
                        {subloc.title}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </td>
            </tr>
          )}
        </table>
      )}
    </div>
  );
};

export default LocationEntry;
