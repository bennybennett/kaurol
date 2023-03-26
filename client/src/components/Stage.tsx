import React from 'react';
import { IEntry, ICharacter, ILocation } from '../../../shared/types/entry';
import Character from './Character';
import Location from './modules/Location/Location';

interface StageProps {
  entry: IEntry | null;
  handleEntryClick: (entryId: string) => void;
}

const Stage: React.FC<StageProps> = ({ entry, handleEntryClick }) => {
  if (!entry) {
    return (
      <div className='stage' style={{ padding: '20px' }}>
        Create an entry
      </div>
    );
  }

  const isCharacter = entry.entryType === 'Character';

  // Switch on entry.entryType to display Character or Location
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

  return <div className='stage'>{renderEntry()}</div>;
};

export default Stage;
