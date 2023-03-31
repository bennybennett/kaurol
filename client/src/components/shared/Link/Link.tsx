import React from 'react';
import styles from './Link.module.css';
import { Link as ReactRouterLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, children }) => {
  return (
    <ReactRouterLink to={href} className={styles.Link}>
      {children}
    </ReactRouterLink>
  );
};

export default Link;
