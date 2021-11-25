import React,{useEffect} from 'react';
import styles from './index.css';
// import { statement } from './Chapter01/index';
import { invoices,plays } from '@/pages/Chapter01/data';
import { statement } from './Chapter01/refactor/refactor';


export default function() {

  const init = () => {
    // statement(invoices,plays);
    console.log('statement',statement(invoices[0],plays));
  }

  useEffect(()=>{
    init();
  },[]);

  return (
    <div className={styles.normal}>
      Refactoring.
    </div>
  );
}
