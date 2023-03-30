import React, { useEffect, useRef, useState } from 'react';
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
  const [highlightedText, setHighlightedText] = useState<string | null>(
    description
  );
  const pRef = useRef<HTMLTextAreaElement>(null);

  const handleHighlight = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const selection = window.getSelection()?.toString();

    if (selection && selection !== '') {
      const text = e.currentTarget.value;
      const highlightedSelection = `{{${selection}}}`;
      const newText = text.replace(selection, highlightedSelection);
      console.log(newText);
      setHighlightedText(selection);
    } else {
      setHighlightedText('');
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (pRef.current && !pRef.current.contains(e.target as Node)) {
        setHighlightedText('');
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleDescriptionChange(event.target.value);
  };

  return (
    <div className={styles['StageEntry-description']}>
      {mode === StageEntryMode.Edit ? (
        <div>
          {highlightedText && highlightedText !== description && (
            <div className={styles['StageEntry-description--link']}>
              <span>
                You highlighted: "
                <span style={{ fontStyle: 'italic' }}>{highlightedText}</span>"
              </span>
            </div>
          )}
          <textarea
            className={styles['StageEntry-description-edit']}
            value={description}
            onChange={handleChange}
            spellCheck={false}
            onMouseUp={handleHighlight}
            onBlur={() => setHighlightedText(null)}
          />
        </div>
      ) : (
        <MarkdownRenderer markdownText={description} />
      )}
    </div>
  );
};

export default EntryDescription;
