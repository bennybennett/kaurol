import React, { useEffect, useState } from 'react';
import {
  ISuggestion,
  IOneSidedRelationshipSuggestion,
  IAddMoreRelationshipsSuggestion,
} from '../../../../../shared/types/kaurol';
import { getSuggestions } from '../../../api/kaurol';
import Link from '../../shared/Link/Link';
import Button from '../../ui/Button/Button';
import styles from './Kaurol.module.css';

interface KaurolProps {
  handleEntryClick: (entryId: string) => void;
}

const Kaurol: React.FC<KaurolProps> = ({ handleEntryClick }) => {
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const suggestionsResponse = await getSuggestions();
      setSuggestions(suggestionsResponse);
    };
    fetchSuggestions();
  }, []);

  const handleNextSuggestion = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
  };

  const renderSuggestion = (suggestion: ISuggestion) => {
    switch (suggestion.type) {
      case 'OneSidedRelationshipSuggestion':
        const oneSidedSuggestion =
          suggestion as IOneSidedRelationshipSuggestion;
        return (
          <div>
            One-sided relationship between{' '}
            <Link
              callback={() =>
                handleEntryClick(oneSidedSuggestion.fromCharacter.id)
              }
              text={oneSidedSuggestion.fromCharacter.name}
            />{' '}
            and{' '}
            <Link
              callback={() =>
                handleEntryClick(oneSidedSuggestion.toCharacter.id)
              }
              text={oneSidedSuggestion.toCharacter.name}
            />
            . Try adding a relationship from{' '}
            {oneSidedSuggestion.toCharacter.name} to{' '}
            {oneSidedSuggestion.fromCharacter.name}.
          </div>
        );
      case 'AddMoreRelationshipsSuggestion':
        const addMoreSuggestion = suggestion as IAddMoreRelationshipsSuggestion;
        return (
          <div>
            Character{' '}
            <Link
              callback={() => handleEntryClick(addMoreSuggestion.character.id)}
              text={addMoreSuggestion.character.name}
            />{' '}
            has very few relationships. Try adding more relationships to this
            character.
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.Kaurol}>
      <h2>Kaurol</h2>
      {suggestions.length > 0 && (
        <div>
          <h3>{suggestions[currentIndex].type}</h3>
          {renderSuggestion(suggestions[currentIndex])}
          <Button
            callback={() => handleNextSuggestion()}
            text='Next Suggestion'
          />
        </div>
      )}
    </div>
  );
};

export default Kaurol;
