import React, { useRef, useEffect, useState } from 'react';
import styles from '../css/techTooltip.module.css';

const TechTooltip = ({ tech, position, onClose, isEnglish }) => {
  const tooltipRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  console.log('TechTooltip rendered:', tech?.name, position);

  useEffect(() => {
    if (tech && !isVisible) {
      console.log('Setting tooltip visible');
      setIsVisible(true);
    }
  }, [tech, isVisible]);

  const handleClose = () => {
    console.log('Closing tooltip');
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!tech) {
    console.log('No tech provided');
    return null;
  }

  const description = isEnglish ? tech.descriptionEN : tech.descriptionES;

  return (
    <div 
      className={`${styles.tooltip} ${isVisible ? styles.visible : ''}`}
      ref={tooltipRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, 0)',
        zIndex: 9999
      }}
      data-tooltip
    >
      {/* Simple content for debugging */}
      <div style={{ 
        background: 'rgba(0, 0, 0, 0.9)', 
        color: 'white', 
        padding: '1rem', 
        borderRadius: '8px',
        minWidth: '300px',
        border: '1px solid #4a90e2'
      }}>
        <button 
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >
          ×
        </button>
        
        <h3 style={{ margin: '0 0 8px 0', color: '#4a90e2' }}>{tech.name}</h3>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#ccc' }}>
          {tech.category} • {tech.level} • {tech.experience}
        </p>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default TechTooltip;
