import React, { useState, useEffect } from 'react';
import { IEntry } from '../../../../../shared/types/entry';
import { getAllEntries } from '../../../api/entries';
import EntryTypeLabel from '../../ui/EntryTypeLabel/EntryTypeLabel';
import styles from './EntryList.module.css';
import { Link as RouterLink } from 'react-router-dom';

const EntryList: React.FC = () => {
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

  const filteredEntries = entries
    .filter((entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const lastWordA = a.title.match(/[A-Z][a-z]*$/)?.[0];
      const lastWordB = b.title.match(/[A-Z][a-z]*$/)?.[0];
      const firstWordA = a.title.match(/^[A-Z][a-z]*/)?.[0];
      const firstWordB = b.title.match(/^[A-Z][a-z]*/)?.[0];

      return (
        (lastWordA && lastWordB ? lastWordA.localeCompare(lastWordB) : 0) ||
        (firstWordA && firstWordB
          ? firstWordA.localeCompare(firstWordB)
          : firstWordA
          ? -1
          : firstWordB
          ? 1
          : 0)
      );
    });

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
            <li className={styles['EntryList-category']}>
              <strong>{entryType}</strong>
            </li>
            {groupedFilteredEntries[entryType].map((entry: IEntry) => (
              <RouterLink to={`/entries/${entry._id}`} key={entry._id}>
                <li className={styles['EntryList-item']}>
                  <EntryTypeLabel
                    seedText={entry.entryType}
                    letter={entry.entryType ? entry.entryType.charAt(0) : ''}
                  />
                  {entry.title}
                </li>
              </RouterLink>
            ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default EntryList;
