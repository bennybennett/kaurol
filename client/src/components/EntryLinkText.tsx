import React, { useState, useEffect, useRef } from 'react';

interface EntryLinkTextProps {
  text: string;
}

const EntryLinkText: React.FC<EntryLinkTextProps> = ({ text }) => {
  const [highlightedText, setHighlightedText] = useState<string>(text);
  const pRef = useRef<HTMLParagraphElement>(null);

  const handleHighlight = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const selection = window.getSelection()?.toString();
    if (selection && selection !== '') {
      const text = e.currentTarget.innerText;
      const highlightedText = `{{${selection}}}`;
      const newText = text.replace(selection, highlightedText);
      console.log(newText); // This will be the new description
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

  return (
    <div>
      <p ref={pRef}>
        <strong onMouseUp={handleHighlight}>{text}</strong>
      </p>
      {highlightedText && highlightedText !== text && (
        <div>
          <span>
            You highlighted: "
            <span style={{ fontStyle: 'italic' }}>{highlightedText}</span>"
          </span>
        </div>
      )}
    </div>
  );
};

export default EntryLinkText;
