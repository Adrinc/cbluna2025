import React from 'react';
import styles from '../css/techScanlines.module.css';

const TechScanlines = () => {
  return (
    <div className={styles.scanlinesContainer}>
      <div className={styles.scanline}></div>
      <div className={styles.scanline}></div>
      <div className={styles.scanline}></div>
      <div className={styles.grid}></div>
    </div>
  );
};

export default TechScanlines;
