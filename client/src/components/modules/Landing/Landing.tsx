import React from 'react';
import styles from './Landing.module.css';
import Button from '../../ui/Button/Button';

interface LandingProps {}

const Landing: React.FC<LandingProps> = ({}) => {
  return (
    <div className={styles.Landing}>
      <Button href={'/entries/create?type=Character'}>Add Character</Button>
      <Button callback={() => {}}>Add Location</Button>
    </div>
  );
};

export default Landing;
