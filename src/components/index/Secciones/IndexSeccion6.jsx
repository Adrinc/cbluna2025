import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import { translations } from '../../../data/translations';
import TechStackGrouped from '../components/TechStackGrouped.jsx';
import { useRef, useEffect, useState } from 'react';
import styles from '../css/indexSeccion6.module.css';

const IndexSeccion6 = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? translations.en : translations.es;
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    let hasAnimated = false;
    if (!section) return;
    
    // Fallback para móviles: activar automáticamente después de un retraso
    const fallbackTimer = setTimeout(() => {
      if (!hasAnimated && section) {
        section.classList.add(styles.fadeInUp);
        hasAnimated = true;
      }
    }, 1000);
    
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          clearTimeout(fallbackTimer);
          section.classList.add(styles.fadeInUp);
          hasAnimated = true;
          observer.disconnect();
        }
      },
      { 
        threshold: window.innerWidth <= 768 ? 0.1 : 0.2,
        rootMargin: '50px 0px -50px 0px'
      }
    );
    
    observer.observe(section);
    
    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section id="tech_stack" className={styles.section} ref={sectionRef}>
      {/* Advanced background effects */}
      <div className={styles.neuralNetwork} />
      <div className={styles.particleField} />
      <div className={styles.scanLines} />
      <div className={styles.gradientBackgroundTop}></div>
      <div className={styles.gradientBackgroundBottom}></div>

      {/* Enhanced header section */}
      <div className={styles.headerContainer}>
        <div className={styles.headerBadge}>
          <span className={styles.pulse} />
          <span className={styles.badgeText}>TECH STACK 2025</span>
        </div>
        <h1 className={styles.title}>
          <span className={styles.titleGlow}>{t.techSection.title}</span>
        </h1>
        <h2 className={styles.subtitle}>
          <span className={styles.subtitleAccent}>{t.techSection.subtitle}</span>
        </h2>
        <div className={styles.titleDivider} />
      </div>

      {/* Tech Stack Content */}
      <div className={styles.techContainer}>
        <TechStackGrouped useTooltip={true} />
      </div>

      {/* Floating tech elements */}
      <div className={styles.floatingElements}>
        <div className={styles.floatingIcon} style={{'--delay': '0s'}}>⚡</div>
        <div className={styles.floatingIcon} style={{'--delay': '1s'}}>🔮</div>
        <div className={styles.floatingIcon} style={{'--delay': '2s'}}>🚀</div>
        <div className={styles.floatingIcon} style={{'--delay': '3s'}}>💎</div>
        <div className={styles.floatingIcon} style={{'--delay': '4s'}}>🌐</div>
        <div className={styles.floatingIcon} style={{'--delay': '5s'}}>⚛️</div>
      </div>
    </section>
  );
};

export default IndexSeccion6;
