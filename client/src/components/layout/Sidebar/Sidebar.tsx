import React from 'react';
import styles from './Sidebar.module.css';
import EntryList from '../../modules/EntryList/EntryList';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar: React.FC = ({}) => {
  return (
    <div className={styles.Sidebar}>
      <div className={styles.Logo}>
        <RouterLink to='/'>KAUROL</RouterLink>
      </div>
      <EntryList />
    </div>
  );
};

export default Sidebar;
