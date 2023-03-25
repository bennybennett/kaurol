import React from 'react';
import { IEntry, ICharacter } from '../../../shared/types/entry';
import Character from './Character';

interface StageProps {
  entry: IEntry | null;
  handleEntryClick: (entryId: string) => void;
}

const Stage: React.FC<StageProps> = ({ entry, handleEntryClick }) => {
  if (!entry) {
    return (
      <div className='stage' style={{ padding: '20px' }}>
        Select an entry
      </div>
    );
  }

  const isCharacter = entry.entryType === 'Character';

  return (
    <div className='stage'>
      {isCharacter ? (
        <Character
          character={entry as ICharacter}
          handleEntryClick={handleEntryClick}
        />
      ) : (
        <div>
          <h2>{entry.title} - (Uncategorized Entry)</h2>
          <p>{entry.description}</p>
        </div>
      )}
    </div>
  );
};

export default Stage;
