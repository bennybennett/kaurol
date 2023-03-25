import React, { useState, useEffect } from 'react';
import { IEntry } from '../../../../../shared/types/entry';
import { getAllEntries } from '../../../api/entries';
import Button from '../../ui/Button/Button';

interface EntryListProps {
  handleEntryClick: (entryId?: string) => void;
  selectedEntry: IEntry | null;
}

const EntryList: React.FC<EntryListProps> = ({
  handleEntryClick,
  selectedEntry,
}) => {
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllEntries();
        setEntries(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredEntries = entries
    .filter((entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aName = a.title.trim();
      const bName = b.title.trim();

      // Split names into components and reverse them
      const aComponents = aName.split(' ').reverse();
      const bComponents = bName.split(' ').reverse();

      // Get the first and last names of the reversed name components
      const aFirst = aComponents.pop()!;
      const aLast = aComponents.pop()!;
      const bFirst = bComponents.pop()!;
      const bLast = bComponents.pop()!;

      // Compare last names first
      const lastCompare = aLast.localeCompare(bLast);
      if (lastCompare !== 0) {
        return lastCompare;
      }

      // Compare first names if last names are the same
      return aFirst.localeCompare(bFirst);
    });

  return (
    <div className='entries'>
      <div className='search-container'>
        <input
          type='text'
          className='search-input'
          placeholder='Search entries...'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <ul>
        {!entries && <li>Loading...</li>}
        {filteredEntries.length < entries.length && (
          <small>
            Showing {filteredEntries.length} of {entries.length} entries
          </small>
        )}

        {filteredEntries.map((entry: IEntry) => (
          <li
            key={entry._id}
            onClick={() => handleEntryClick(entry._id)}
            className={selectedEntry?._id === entry._id ? 'selected' : ''}
          >
            {entry.title}
          </li>
        ))}
      </ul>
      <Button text='Add Character' callback={() => handleEntryClick()} />
    </div>
  );
};

export default EntryList;
