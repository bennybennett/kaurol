import React, { useEffect, useState } from 'react';
import styles from './StageEntry.module.css';
import {
  ICharacter,
  ILocation,
  IEntry,
} from '../../../../../shared/types/entry';
import CharacterEntry from '../CharacterEntry/CharacterEntry';
import LocationEntry from '../LocationEntry/LocationEntry';
import EntryDescription from './EntryDescription';
import Button from '../../ui/Button/Button';
import Chip from '../../ui/Chip/Chip';

import { updateEntry } from '../../../api/entries';

interface StageEntryProps {
  entry: IEntry;
}

export enum StageEntryMode {
  View = 'view',
  Edit = 'edit',
  Delete = 'delete',
}

const StageEntry: React.FC<StageEntryProps> = ({ entry }) => {
  const [mode, setMode] = useState<StageEntryMode>(StageEntryMode.View);
  const [description, setDescription] = useState(entry.description);

  useEffect(() => {
    setDescription(entry.description);
  }, [entry.description]);

  const renderEntry = () => {
    switch (entry.entryType) {
      case 'Character':
        return (
          <CharacterEntry
            character={entry as ICharacter}
            mode={mode}
            setModeBackToDefault={() => setMode(StageEntryMode.View)}
          />
        );
      case 'Location':
        return <LocationEntry entry={entry as ILocation} />;
      default:
        return (
          <div>
            <h2>{entry.title} - (Uncategorized Entry)</h2>
            <p>{entry.description}</p>
          </div>
        );
    }
  };

  const cancelEdit = () => {
    setMode(StageEntryMode.View);
    setDescription(entry.description);
  };

  const saveEdit = async () => {
    setMode(StageEntryMode.View);

    await updateEntry(entry._id, { description }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className={`${styles.StageEntry} ${styles[`StageEntry-${mode}`]}`}>
      <h1>{entry.title}</h1>
      <Chip>{entry.entryType}</Chip>
      <div className={styles['StageEntry--buttons']}>
        {mode === StageEntryMode.Edit ? (
          <>
            <Button callback={cancelEdit} text='Cancel' />
            <Button callback={saveEdit} text='Save' />
          </>
        ) : (
          <div>
            <Button callback={() => setMode(StageEntryMode.Edit)} text='Edit' />
            <Button
              callback={() => setMode(StageEntryMode.Delete)}
              text='Delete'
            />
          </div>
        )}
      </div>
      <EntryDescription
        description={description}
        mode={mode}
        handleDescriptionChange={setDescription}
      />
      {renderEntry()}
    </div>
  );
};

export default StageEntry;
