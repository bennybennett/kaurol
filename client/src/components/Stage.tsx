import React from 'react';
import { IEntry, ICharacter, ILocation } from '../../../shared/types/entry';
import StageEntry from './modules/StageEntry/StageEntry';

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

  return (
    <div className='stage'>
      <StageEntry entry={entry} handleEntryClick={handleEntryClick} />
    </div>
  );
};

export default Stage;
