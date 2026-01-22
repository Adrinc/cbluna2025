import { translations } from '../../../data/translations';
import { isEnglish } from '../../../data/variables';
import { useStore } from '@nanostores/react';
import TechProjectGallery from '../components/TechProjectGallery.jsx';
import LiveStats from '../components/LiveStats.jsx';
import { useRef, useEffect } from 'react';

import styles from '../css/indexSeccion3.module.css';

// Datos de proyectos con categorías


const IndexSeccion3 = () => {
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
    <section id="our_adventages" className={styles.sections} ref={sectionRef}>
      {/* Advanced background effects */}
      <div className={styles.neuralNetwork} />
      <div className={styles.particleField} />
      <div className={styles.scanLines} />
      <div className={styles.gradientBackgroundTop}></div>
      <div className={styles.gradientBackgroundBottom}></div>

      <div className={styles.container}>
        {/* Enhanced header section */}
        <div className={styles.content}>
          <div className={styles.headerBadge}>
            <span className={styles.pulse} />
            <span className={styles.badgeText}>ADVANCED TECH PORTFOLIO</span>
          </div>
          <h1 className={styles.title}>
            <span className={styles.titleGlow}>{t.projectsTitle}</span>
          </h1>
          <h2 className={styles.subtitle}>
            <span className={styles.subtitleAccent}>{t.projectsSubtitle}</span>
          </h2>
          <div className={styles.titleDivider} />
        </div>

        {/* Live statistics component */}
        <LiveStats />

        {/* Tech project gallery */}
        <div className={styles.galleryContainer}>
          <TechProjectGallery 
         
            onProjectSelect={(project) => {
              console.log('Proyecto seleccionado:', project);
              // Aquí puedes agregar lógica para manejar la selección del proyecto
            }}
          />
        </div>
      </div>


    </section>
  );
};

export default IndexSeccion3;
