import React from 'react';
import styles from './Link.module.css';

interface LinkProps {
  callback: () => void;
  text: string;
}

const Link: React.FC<LinkProps> = ({ callback, text }) => {
  return (
    <div className={styles.Link} onClick={callback}>
      {text}
    </div>
  );
};

export default Link;
