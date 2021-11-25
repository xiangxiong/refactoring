import React from 'react';
import styles from './index.css';

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Refactoring.</h1>
      {props.children}
    </div>
  );
};

export default BasicLayout;
