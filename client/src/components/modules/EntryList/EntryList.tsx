import React, { useState, useEffect } from 'react';
import { IEntry } from '../../../../../shared/types/entry';
import { getAllEntries } from '../../../api/entries';
import Button from '../../ui/Button/Button';
import EntryTypeLabel from '../../ui/EntryTypeLabel/EntryTypeLabel';
import styles from './EntryList.module.css';

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

  const groupEntriesByType = (entries: IEntry[]) => {
    return entries.reduce((groupedEntries, entry) => {
      const entryType = entry.entryType || 'Uncategorized';
      if (!groupedEntries[entryType]) {
        groupedEntries[entryType] = [];
      }
      groupedEntries[entryType].push(entry);
      return groupedEntries;
    }, {} as Record<string, IEntry[]>);
  };

  const filteredEntries = entries.filter((entry) =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedFilteredEntries = groupEntriesByType(filteredEntries);
  return (
    <div className={styles.EntryList}>
      <div className={styles['search-container']}>
        <input
          type='text'
          className={styles['search-input']}
          placeholder='Search entries...'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <ul>
        {!entries && <li>Loading...</li>}
        {Object.keys(groupedFilteredEntries).map((entryType) => (
          <React.Fragment key={entryType}>
            <li>
              <strong>{entryType}</strong>
            </li>
            {groupedFilteredEntries[entryType].map((entry: IEntry) => (
              <li
                key={entry._id}
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={() => handleEntryClick(entry._id)}
                className={selectedEntry?._id === entry._id ? 'selected' : ''}
              >
                <EntryTypeLabel
                  letter={entry.entryType ? entry.entryType.charAt(0) : ''}
                />
                {entry.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <Button text='Add Character' callback={() => handleEntryClick()} />
    </div>
  );
};

export default EntryList;
