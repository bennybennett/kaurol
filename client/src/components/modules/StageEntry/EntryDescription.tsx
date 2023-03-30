import React from 'react';
import styles from './StageEntry.module.css';
import { StageEntryMode } from './StageEntry';
import MarkdownRenderer from '../../shared/MarkdownRenderer/MarkdownRenderer';

interface EntryDescriptionProps {
  description: string;
  mode: StageEntryMode;
  handleDescriptionChange: (value: string) => void;
}

const EntryDescription: React.FC<EntryDescriptionProps> = ({
  description,
  mode,
  handleDescriptionChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleDescriptionChange(event.target.value);
  };

  return (
    <div className={styles['StageEntry-description']}>
      {mode === StageEntryMode.Edit ? (
        <textarea
          className={styles['StageEntry-description-edit']}
          value={description}
          onChange={handleChange}
          spellCheck={false}
        />
      ) : (
        <MarkdownRenderer markdownText={description} />
      )}
    </div>
  );
};

export default EntryDescription;
