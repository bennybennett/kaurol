import React from 'react';
import styles from './StageEntry.module.css';
import { IEntry } from '../../../../../shared/types/entry';
import { ICharacter, ILocation } from '../../../../../shared/types/entry';
import Character from '../../Character';
import Location from '../Location/Location';

interface StageEntryProps {
  entry: IEntry;
  handleEntryClick: (entryId: string) => void;
}

const StageEntry: React.FC<StageEntryProps> = ({ entry, handleEntryClick }) => {
  const renderEntry = () => {
    switch (entry.entryType) {
      case 'Character':
        return (
          <Character
            character={entry as ICharacter}
            handleEntryClick={handleEntryClick}
          />
        );
      case 'Location':
        return (
          <Location
            entry={entry as ILocation}
            handleEntryClick={handleEntryClick}
          />
        );
      default:
        return (
          <div>
            <h2>{entry.title} - (Uncategorized Entry)</h2>
            <p>{entry.description}</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.StageEntry}>
      <h1>{entry.title}</h1>
      <h4>{entry.entryType}</h4>
      {renderEntry()}
    </div>
  );
};

export default StageEntry;
