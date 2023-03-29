import React, { useState } from 'react';
import styles from './StageEntry.module.css';
import {
  ICharacter,
  ILocation,
  IEntry,
} from '../../../../../shared/types/entry';
import Character from './Character';
import Location from '../Location/Location';
import Button from '../../ui/Button/Button';

interface StageEntryProps {
  entry: IEntry;
  handleEntryClick: (entryId: string) => void;
}

export enum StageEntryMode {
  View = 'view',
  Edit = 'edit',
  Link = 'link',
  Delete = 'delete',
}

const StageEntry: React.FC<StageEntryProps> = ({ entry, handleEntryClick }) => {
  const [mode, setMode] = useState<StageEntryMode>(StageEntryMode.View);

  const renderEntry = () => {
    switch (entry.entryType) {
      case 'Character':
        return (
          <Character
            character={entry as ICharacter}
            handleEntryClick={handleEntryClick}
            mode={mode}
            setModeBackToDefault={() => setMode(StageEntryMode.View)}
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
    <div className={`${styles.StageEntry} ${styles[`StageEntry-${mode}`]}`}>
      <small>{mode !== StageEntryMode.View && `Mode: ${mode}`}</small>
      <h1>{entry.title}</h1>
      <h4>{entry.entryType}</h4>
      {renderEntry()}
      <div className={styles['StageEntry--buttons']}>
        {mode !== StageEntryMode.View ? (
          <Button callback={() => setMode(StageEntryMode.View)} text='Back' />
        ) : (
          <div>
            <Button callback={() => setMode(StageEntryMode.Link)} text='Link' />
            <Button callback={() => setMode(StageEntryMode.Edit)} text='Edit' />
            <Button
              callback={() => setMode(StageEntryMode.Delete)}
              text='Delete'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StageEntry;
