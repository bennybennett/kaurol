import React from 'react';
import styles from './Button.module.css';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  children: string;
  callback?: () => void;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ children, href, callback }) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (callback) {
      callback();
    } else if (href) {
      event.preventDefault();

      navigate(href);
    }
  };

  return (
    <button className={styles.Button} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
