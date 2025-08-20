import React, { useEffect, useRef } from 'react';
import styles from '../css/holographicInterface.module.css';

const HolographicInterface = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createHologramElement = () => {
      const element = document.createElement('div');
      element.className = styles.hologramElement;
      
      // Formas geométricas variadas
      const shapes = ['circle', 'triangle', 'square', 'diamond'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      element.classList.add(styles[shape]);
      
      // Posición aleatoria
      element.style.left = Math.random() * 100 + '%';
      element.style.top = Math.random() * 100 + '%';
      element.style.animationDelay = Math.random() * 5 + 's';
      element.style.animationDuration = (Math.random() * 10 + 5) + 's';
      
      container.appendChild(element);
      
      // Remover después de la animación
      setTimeout(() => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }, 15000);
    };

    // Crear elementos iniciales
    for (let i = 0; i < 8; i++) {
      setTimeout(() => createHologramElement(), i * 1000);
    }

    // Continuar creando elementos
    const interval = setInterval(createHologramElement, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.holographicContainer}>
      {/* Elementos de interfaz fijos */}
      <div className={styles.cornerInterface}>
        <div className={styles.corner + ' ' + styles.topLeft}></div>
        <div className={styles.corner + ' ' + styles.topRight}></div>
        <div className={styles.corner + ' ' + styles.bottomLeft}></div>
        <div className={styles.corner + ' ' + styles.bottomRight}></div>
      </div>
      
      <div className={styles.centerTarget}>
        <div className={styles.targetRing}></div>
        <div className={styles.targetRing}></div>
        <div className={styles.targetRing}></div>
      </div>
    </div>
  );
};

export default HolographicInterface;
