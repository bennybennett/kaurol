import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: string;
  callback?: () => void;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ children, href, callback }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (callback) {
      callback();
    } else if (href) {
      event.preventDefault();

      window.location.href = href;
    }
  };
  return (
    <button className={styles.Button} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
