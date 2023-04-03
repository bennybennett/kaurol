import React from 'react';
import { IEntry } from '../../../shared/types/entry';
import StageEntry from './modules/StageEntry/StageEntry';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEntryById } from '../api/entries';
import Button from './ui/Button/Button';

const Stage: React.FC = () => {
  const [selectedEntry, setSelectedEntry] = useState<IEntry | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEntry = async () => {
      if (id) {
        const fetchedEntry = await getEntryById(id);
        setSelectedEntry(fetchedEntry);
      } else {
        setSelectedEntry(null);
      }
    };

    fetchEntry();
  }, [id]);

  if (!selectedEntry) {
    return (
      <div className='stage' style={{ padding: '20px' }}>
        <Button href={'/entries/create?type=Character'}>Add Character</Button>
        <Button callback={() => {}}>Add Location</Button>
      </div>
    );
  }

  return (
    <div className='stage'>
      <StageEntry entry={selectedEntry} />
    </div>
  );
};

export default Stage;
