import React, { useEffect, useRef } from 'react';
import styles from '../css/floatingElements.module.css';

const FloatingElements = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createFloatingElement = () => {
      const element = document.createElement('div');
      element.className = styles.floatingElement;
      
      // Random tech symbols
      const symbols = ['</>', '{}', '[]', '()', '<html>', '{css}', 'JS', 'API', 'SQL', 'AI'];
      element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      
      // Random position and animation
      element.style.left = Math.random() * 100 + '%';
      element.style.animationDuration = (Math.random() * 20 + 10) + 's';
      element.style.animationDelay = Math.random() * 5 + 's';
      element.style.fontSize = (Math.random() * 0.5 + 0.5) + 'rem';
      element.style.opacity = Math.random() * 0.3 + 0.1;
      
      container.appendChild(element);
      
      // Remove element after animation
      setTimeout(() => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }, 25000);
    };

    // Create initial elements
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createFloatingElement(), i * 1000);
    }

    // Continue creating elements
    const interval = setInterval(createFloatingElement, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={containerRef} className={styles.floatingContainer} />;
};

export default FloatingElements;
