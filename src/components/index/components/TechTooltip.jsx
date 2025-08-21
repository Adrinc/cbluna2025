import React, { useRef, useEffect, useState } from 'react';
import styles from '../css/techTooltip.module.css';

const TechTooltip = ({ tech, position, onClose, isEnglish }) => {
  const tooltipRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  useEffect(() => {
    if (tech && !isVisible) {
      setIsVisible(true);
      
      // Ajustar posición para que no se salga de la pantalla
      setTimeout(() => {
        if (tooltipRef.current) {
          const tooltip = tooltipRef.current;
          const rect = tooltip.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          
          let newX = position.x;
          let newY = position.y;
          
          // Ajustar horizontalmente
          if (rect.right > viewportWidth - 20) {
            newX = position.x - rect.width / 2;
          }
          if (rect.left < 20) {
            newX = 20 + rect.width / 2;
          }
          
          // Ajustar verticalmente
          if (rect.bottom > viewportHeight - 20) {
            newY = position.y - rect.height - 20;
          }
          
          setAdjustedPosition({ x: newX, y: newY });
        }
      }, 10);
    }
  }, [tech, isVisible, position]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!tech) return null;

  const description = isEnglish ? tech.descriptionEN : tech.descriptionES;

  return (
    <div 
      className={`${styles.tooltip} ${isVisible ? styles.visible : ''}`}
      ref={tooltipRef}
      style={{
        left: adjustedPosition.x,
        top: adjustedPosition.y,
        transform: 'translateX(-50%)'
      }}
      data-tooltip
    >
      {/* Arrow */}
      <div className={styles.arrow} />
      
      {/* Close Button */}
      <button className={styles.closeButton} onClick={handleClose}>
        ×
      </button>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <img src={tech.logo} alt={tech.name} className={styles.logo} />
          <div className={styles.logoGlow} style={{ '--tech-color': tech.color }} />
        </div>
        <div className={styles.titleInfo}>
          <h3 className={styles.title}>{tech.name}</h3>
          <div className={styles.badges}>
            <span className={styles.categoryBadge}>
              {tech.category === 'lenguaje' && '💻'}
              {tech.category === 'framework' && '🔧'}
              {tech.category === 'base de datos' && '🗄️'}
              {tech.category === 'servicio' && '☁️'}
              {tech.category === 'software' && '⚙️'}
              {tech.category === 'servidor' && '🖥️'}
              {tech.category}
            </span>
            <span className={styles.levelBadge} data-level={tech.level}>
              {tech.level === 'expert' ? (isEnglish ? 'Expert' : 'Experto') :
               tech.level === 'advanced' ? (isEnglish ? 'Advanced' : 'Avanzado') :
               (isEnglish ? 'Intermediate' : 'Intermedio')}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.experience}>
          <span className={styles.experienceLabel}>
            {isEnglish ? 'Experience:' : 'Experiencia:'}
          </span>
          <span className={styles.experienceValue}>{tech.experience}</span>
        </div>
        
        <div className={styles.description}>
          <p>{description}</p>
        </div>
      </div>

      {/* Background Effects */}
      <div className={styles.backgroundEffect} />
      <div className={styles.shimmer} />
    </div>
  );
};

export default TechTooltip;
