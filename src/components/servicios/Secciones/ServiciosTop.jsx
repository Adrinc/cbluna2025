import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import { serviciosTranslations } from '../../../data/translations_servicios';
import styles from '../css/serviciosTop.module.css';

const ServiciosTop = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? serviciosTranslations.en : serviciosTranslations.es;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer para animaciones
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      className={`${styles.heroSection} ${isVisible ? styles.visible : ''}`}
      ref={sectionRef}
    >
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.gridPattern}></div>
        <div className={styles.glowOrbs}></div>
        <div className={styles.particleField}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.heroContent}>
          {/* Section Label */}
          <div className={styles.sectionLabel}>
            <span className={styles.labelText}>Servicios</span>
            <div className={styles.labelLine}></div>
          </div>

          {/* Main Title */}
          <h1 className={styles.heroTitle}>
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <div className={styles.heroSubtitle}>
            <span className={styles.subtitleText}>{t.hero.subtitle}</span>
            <span className={styles.highlightText}>{t.hero.highlight}</span>
          </div>

          {/* Description */}
          <p className={styles.heroDescription}>
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className={styles.ctaButtons}>
            <button className={styles.primaryButton}>
              <span>Explorar Servicios</span>
              <div className={styles.buttonGlow}></div>
            </button>
            <button className={styles.secondaryButton}>
              <span>Contactar</span>
            </button>
          </div>
        </div>

        {/* Decorative Tech Elements */}
        <div className={styles.techDecorations}>
          <div className={styles.floatingIcons}>
            {['🌐', '📱', '🎥', '📊', '💡'].map((icon, index) => (
              <div 
                key={index}
                className={styles.floatingIcon}
                style={{ 
                  '--delay': `${index * 0.5}s`,
                  '--x': `${Math.random() * 100}%`,
                  '--y': `${Math.random() * 100}%`
                }}
              >
                {icon}
              </div>
            ))}
          </div>

          {/* Code Elements */}
          <div className={styles.codeElements}>
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i}
                className={styles.codeElement}
                style={{ 
                  '--delay': `${i * 0.3}s`,
                  '--x': `${Math.random() * 100}%`,
                  '--y': `${Math.random() * 100}%`
                }}
              >
                {['{ }', '< >', '[ ]', '( )', '=>', '||', '&&', '!=', '===', '++'][i % 10]}
              </div>
            ))}
          </div>

          {/* Geometric Shapes */}
          <div className={styles.geometricShapes}>
            <div className={styles.shape1}></div>
            <div className={styles.shape2}></div>
            <div className={styles.shape3}></div>
          </div>
        </div>
      </div>

      {/* Stats Preview */}
      <div className={styles.statsPreview}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>500+</div>
          <div className={styles.statLabel}>Proyectos</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>8+</div>
          <div className={styles.statLabel}>Años</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>200+</div>
          <div className={styles.statLabel}>Clientes</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>30+</div>
          <div className={styles.statLabel}>Tecnologías</div>
        </div>
      </div>

      {/* Bottom Transition */}
      <div className={styles.bottomTransition}></div>
    </section>
  );
};

export default ServiciosTop;
