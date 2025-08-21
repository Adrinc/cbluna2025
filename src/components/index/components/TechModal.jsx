import React, { useRef, useEffect, useState } from 'react';
import styles from '../css/techModal.module.css';

const TechModal = ({ tech, onClose, isEnglish, clickPosition }) => {
  const modalRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: '50%', left: '50%' });

  useEffect(() => {
    if (tech && !isVisible) {
      setIsVisible(true);
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
      
      // Calculate optimal modal position based on click position and viewport
      if (clickPosition) {
        const { clientX, clientY } = clickPosition;
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // Calculate percentage position
        let topPercent = (clientY / viewportHeight) * 100;
        let leftPercent = (clientX / viewportWidth) * 100;
        
        // Ensure modal stays within viewport bounds with some padding
        topPercent = Math.max(15, Math.min(85, topPercent));
        leftPercent = Math.max(15, Math.min(85, leftPercent));
        
        setModalPosition({
          top: `${topPercent}%`,
          left: `${leftPercent}%`
        });
      }
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [tech, isVisible, clickPosition]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!tech) return null;

  const description = isEnglish ? tech.descriptionEN : tech.descriptionES;

  return (
    <div 
      className={`${styles.modalBackdrop} ${isVisible ? styles.visible : ''}`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`${styles.modal} ${isVisible ? styles.visible : ''}`} 
        ref={modalRef}
        style={{
          top: modalPosition.top,
          left: modalPosition.left,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Background Effects */}
        <div className={styles.modalBackground}>
          <div className={styles.quantumField}></div>
          <div className={styles.dataMatrix}></div>
          <div className={styles.energyPulse}></div>
        </div>

        {/* Close Button */}
        <button className={styles.closeButton} onClick={handleClose}>
          <span className={styles.closeIcon}>×</span>
        </button>

        {/* Modal Content */}
        <div className={styles.modalContent}>
          {/* Header Section */}
          <div className={styles.modalHeader}>
            <div className={styles.logoSection}>
              <div className={styles.logoContainer}>
                <div className={styles.logoGlow} style={{ '--tech-color': tech.color }}></div>
                <img src={tech.logo} alt={tech.name} className={styles.techLogo} />
              </div>
              <div className={styles.techBadges}>
                <span className={styles.categoryBadge}>
                  {tech.category === 'language' && '💻'}
                  {tech.category === 'framework' && '🔧'}
                  {tech.category === 'database' && '🗄️'}
                  {tech.category === 'cloud' && '☁️'}
                  {tech.category === 'ai' && '🤖'}
                  {tech.category.toUpperCase()}
                </span>
                <span className={styles.levelBadge} data-level={tech.level}>
                  {tech.level.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className={styles.titleSection}>
              <h2 className={styles.techTitle}>{tech.name}</h2>
              <div className={styles.experienceInfo}>
                <span className={styles.experienceLabel}>
                  {isEnglish ? 'Experience' : 'Experiencia'}
                </span>
                <span className={styles.experienceValue}>{tech.experience}</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className={styles.descriptionSection}>
            <div className={styles.descriptionContainer}>
              <p className={styles.description}>{description}</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className={styles.statsSection}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>⚡</div>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>
                  {isEnglish ? 'Performance' : 'Rendimiento'}
                </span>
                <span className={styles.statValue}>98%</span>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🚀</div>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>
                  {isEnglish ? 'Projects' : 'Proyectos'}
                </span>
                <span className={styles.statValue}>
                  {tech.category === 'language' ? '50+' :
                   tech.category === 'framework' ? '35+' :
                   tech.category === 'database' ? '40+' :
                   tech.category === 'cloud' ? '25+' : '15+'}
                </span>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon}>⭐</div>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>
                  {isEnglish ? 'Mastery' : 'Dominio'}
                </span>
                <span className={styles.statValue}>
                  {tech.level === 'expert' ? '95%' : '85%'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className={styles.actionSection}>
            <button className={styles.actionButton} onClick={handleClose}>
              <span className={styles.actionText}>
                {isEnglish ? 'Explore More Technologies' : 'Explorar Más Tecnologías'}
              </span>
              <div className={styles.actionGlow}></div>
            </button>
          </div>
        </div>

        {/* Particle Effects */}
        <div className={styles.particleSystem}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className={styles.particle} 
              style={{ 
                '--delay': `${i * 0.2}s`,
                '--color': tech.color
              }} 
            />
          ))}
        </div>

        {/* Border Effects */}
        <div className={styles.borderEffect}></div>
      </div>
    </div>
  );
};

export default TechModal;
