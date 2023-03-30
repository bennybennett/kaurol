import React from 'react';
import styles from './Link.module.css';
import { Link as ReactRouterLink } from 'react-router-dom';

interface LinkProps {
  callback?: () => void;
  text: string;
  href: string;
}

const Link: React.FC<LinkProps> = ({ callback, href, text }) => {
  return (
    <ReactRouterLink to={href} className={styles.Link}>
      {text}
    </ReactRouterLink>
  );
};

export default Link;
