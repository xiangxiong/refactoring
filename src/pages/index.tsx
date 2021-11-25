import React,{useEffect,useState} from 'react';
import styles from './index.css';
// import { statement } from './Chapter01/index';
import { invoices,plays } from '@/pages/Chapter01/data';
import { statement } from './Chapter01/refactor/statement';


export default function() {


  const [result,setResult] = useState('');
  const init = () => {
    setResult(statement(invoices[0],plays));
    console.log('statement',statement(invoices[0],plays));
  }

  useEffect(()=>{
    init();
  },[]);

  return (
    <div className={styles.normal} dangerouslySetInnerHTML={{__html:result}}>
      {/* {result} */}
    </div>
  );
}
