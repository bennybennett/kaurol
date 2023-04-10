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

const Kaurol: React.FC = () => {
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
            <Link href={`/entries/${oneSidedSuggestion.fromCharacter.id}`}>
              {oneSidedSuggestion.fromCharacter.name}
            </Link>{' '}
            and{' '}
            <Link href={`/entries/${oneSidedSuggestion.toCharacter.id}`}>
              {oneSidedSuggestion.toCharacter.name}
            </Link>
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
            <Link href={`/entries/${addMoreSuggestion.character.id}`}>
              {addMoreSuggestion.character.name}
            </Link>{' '}
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
      {suggestions.length > 0 && (
        <div>
          <h3>{suggestions[currentIndex].type}</h3>
          {renderSuggestion(suggestions[currentIndex])}
          <Button callback={() => handleNextSuggestion()}>
            Next Suggestion
          </Button>
        </div>
      )}
    </div>
  );
};

export default Kaurol;
