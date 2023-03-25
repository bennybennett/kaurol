import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  callback: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, callback }) => {
  return (
    <button className={styles.Button} onClick={callback}>
      {text}
    </button>
  );
};

export default Button;
