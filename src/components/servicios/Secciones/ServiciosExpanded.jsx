import React, { useRef, useEffect, useState } from "react";
import { isEnglish } from '../../../data/variables';
import { serviciosTranslations } from '../../../data/translations_servicios';
import { useStore } from '@nanostores/react';
import styles from '../css/serviciosExpanded.module.css';

const ServiciosExpanded = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? serviciosTranslations.en : serviciosTranslations.es;
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % t.whyChoose.features.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [t.whyChoose.features.length]);

  return (
    <section id="servicios1" className={`${styles.whyChooseSection} ${isVisible ? styles.visible : ''}`} ref={sectionRef}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.gridPattern}></div>
        <div className={styles.gradientOverlay}></div>
  {/*       <div className={styles.floatingElements}>
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className={styles.floatingElement}
              style={{
                '--delay': `${i * 3}s`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`
              }}
            >
              {['⚡', '🚀', '💎', '🔥', '⭐', '💻', '🎯', '🛡️'][i]}
            </div>
          ))}
        </div> */}
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>{t.whyChoose.label}</span>
          <h2 className={styles.sectionTitle}>
            {t.whyChoose.title.split(' ').map((word, index) => (
              index === 1 ? (
                <span key={index} className={styles.highlight}> {word} </span>
              ) : (
                <span key={index}>{word} </span>
              )
            ))}
          </h2>
          <p className={styles.sectionDescription}>{t.whyChoose.description}</p>
        </div>

        {/* Features Grid */}
        <div className={styles.featuresGrid}>
          {t.whyChoose.features.map((feature, index) => (
            <div 
              key={index}
              className={`${styles.featureCard} ${index === activeFeature ? styles.active : ''}`}
              style={{ '--delay': `${index * 0.1}s` }}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className={styles.cardGlow}></div>
              <div className={styles.featureIcon}>
                <span className={styles.iconSymbol}>{feature.icon}</span>
                <div className={styles.iconGlow}></div>
              </div>
              
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
                
                <div className={styles.featureStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{feature.stat}</span>
                    <span className={styles.statLabel}>{feature.statLabel}</span>
                  </div>
                </div>
              </div>

              <div className={styles.techBorder}></div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className={styles.bottomStats}>
          <div className={styles.statsRow}>
            {t.general.stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statData}>
                  <span className={styles.statNumber}>{stat.value}</span>
                  <span className={styles.statText}>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>{t.whyChoose.cta.title}</h3>
            <p className={styles.ctaDescription}>{t.whyChoose.cta.description}</p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryButton}>
                {t.whyChoose.cta.primaryButton}
                <span className={styles.buttonArrow}>→</span>
              </button>
              <button className={styles.secondaryButton}>
                {t.whyChoose.cta.secondaryButton}
                <span className={styles.buttonIcon}>📞</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiciosExpanded;
