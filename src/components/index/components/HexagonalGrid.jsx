import React from 'react';
import styles from '../css/hexagonalGrid.module.css';

const HexagonalGrid = () => {
  const createHexagons = () => {
    const hexagons = [];
    const rows = 8;
    const cols = 12;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const delay = (row + col) * 0.1;
        hexagons.push(
          <div
            key={`${row}-${col}`}
            className={styles.hexagon}
            style={{
              '--animation-delay': `${delay}s`,
              '--row': row,
              '--col': col,
            }}
          />
        );
      }
    }
    return hexagons;
  };

  return (
    <div className={styles.hexagonalGrid}>
      {createHexagons()}
    </div>
  );
};

export default HexagonalGrid;
