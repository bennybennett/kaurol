import React from 'react';
import styles from './Sidebar.module.css';
import EntryList from '../../modules/EntryList/EntryList';

const Sidebar: React.FC = ({}) => {
  return (
    <div className={styles.Sidebar}>
      <EntryList />
    </div>
  );
};

export default Sidebar;
