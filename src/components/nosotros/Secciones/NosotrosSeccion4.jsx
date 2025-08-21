import React, { useRef, useEffect, useState } from "react";
import { isEnglish } from '../../../data/variables';
import { nosotrosTranslations } from '../../../data/translations_nosotros';
import { useStore } from '@nanostores/react';
import styles from '../css/nosotrosSeccion4.module.css';

const NosotrosSeccion4 = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? nosotrosTranslations.en : nosotrosTranslations.es;
  const sectionRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const [activeIndustry, setActiveIndustry] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add(styles.visible);
          
          // Animate cards sequentially
          t.teamValues.industries.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index]);
            }, 300 * (index + 1));
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [t.teamValues.industries]);

  // Auto-rotate active industry
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndustry(prev => (prev + 1) % t.teamValues.industries.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [t.teamValues.industries.length]);

  return (
    <section id="team-values" className={styles.teamSection} ref={sectionRef}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.techGrid}></div>
        <div className={styles.neuralNetwork}></div>
        <div className={styles.particleField}></div>
        <div className={styles.quantumWaves}></div>
      </div>

      {/* Floating Tech Elements */}
      <div className={styles.floatingElements}>
        {Array.from({ length: 12 }, (_, i) => (
          <div 
            key={i}
            className={styles.floatingElement}
            style={{
              '--delay': `${i * 2}s`,
              '--x': `${20 + i * 8}%`,
              '--y': `${10 + (i % 3) * 30}%`,
              '--rotation': `${i * 30}deg`
            }}
          >
            {['{ }', '< />', '( )', '[ ]', 'AI', 'ML', 'API', 'DB'][i % 8]}
          </div>
        ))}
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.labelContainer}>
            <div className={styles.labelIcon}>🚀</div>
            <span className={styles.sectionLabel}>{t.teamValues.label}</span>
          </div>
          
          <h2 className={styles.sectionTitle}>
            {t.teamValues.title}
          </h2>
          
          <p className={styles.sectionDescription}>
            {t.teamValues.description}
          </p>

          {/* Team Points */}
          <div className={styles.teamPoints}>
            {t.teamValues.teamPoints.map((point, index) => (
              <div 
                key={index}
                className={`${styles.teamPoint} ${visibleCards.includes(index) ? styles.visible : ''}`}
                style={{ '--delay': `${index * 0.2}s` }}
              >
                <div className={styles.pointIcon}>✓</div>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Industries Grid */}
        <div className={styles.industriesSection}>
          <div className={styles.industriesHeader}>
            <h3 className={styles.industriesTitle}>
              <span className={styles.titleIcon}>🏢</span>
              {ingles ? "Industries We Serve" : "Industrias que Atendemos"}
            </h3>
          </div>

          <div className={styles.industriesGrid}>
            {t.teamValues.industries.map((industry, index) => (
              <div 
                key={index}
                className={`${styles.industryCard} ${visibleCards.includes(index) ? styles.visible : ''} ${activeIndustry === index ? styles.active : ''}`}
                style={{ '--delay': `${index * 0.3}s` }}
                onMouseEnter={() => setActiveIndustry(index)}
              >
                {/* Card Background Effects */}
                <div className={styles.cardBackground}>
                  <div className={styles.cardGlow}></div>
                  <div className={styles.cardPattern}></div>
                </div>

                {/* Card Content */}
                <div className={styles.cardContent}>
                  <div className={styles.industryIcon}>
                    <span className={styles.iconSymbol}>{industry.icon}</span>
                    <div className={styles.iconGlow}></div>
                  </div>
                  
                  <h4 className={styles.industryName}>{industry.name}</h4>
                  <p className={styles.industryDescription}>{industry.description}</p>
                </div>

                {/* Card Decorations */}
                <div className={styles.cardDecorations}>
                  <div className={styles.techCorners}>
                    <div className={styles.corner} style={{ '--color': '#00d4ff' }}></div>
                    <div className={styles.corner} style={{ '--color': '#ff006e' }}></div>
                    <div className={styles.corner} style={{ '--color': '#8338ec' }}></div>
                    <div className={styles.corner} style={{ '--color': '#ffbe0b' }}></div>
                  </div>
                  
                  <div className={styles.dataLines}>
                    {Array.from({ length: 3 }, (_, i) => (
                      <div 
                        key={i}
                        className={styles.dataLine}
                        style={{ '--delay': `${i * 0.5}s` }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={styles.cardHover}>
                  <div className={styles.hoverIcon}>→</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Central Tech Element */}
        <div className={styles.centralTech}>
          <div className={styles.techCore}>
            <div className={styles.coreRings}>
              {Array.from({ length: 4 }, (_, i) => (
                <div 
                  key={i}
                  className={styles.coreRing}
                  style={{ 
                    '--size': `${80 + i * 30}px`,
                    '--delay': `${i * 0.5}s` 
                  }}
                ></div>
              ))}
            </div>
            
            <div className={styles.coreCenter}>
              <div className={styles.centerIcon}>⚡</div>
            </div>
          </div>

          {/* Connecting Lines */}
          <div className={styles.connectionLines}>
            {t.teamValues.industries.map((_, index) => (
              <div 
                key={index}
                className={`${styles.connectionLine} ${activeIndustry === index ? styles.active : ''}`}
                style={{ 
                  '--rotation': `${index * 90}deg`,
                  '--color': ['#00d4ff', '#ff006e', '#8338ec', '#ffbe0b'][index % 4]
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className={styles.progressIndicators}>
          {t.teamValues.industries.map((industry, index) => (
            <button
              key={index}
              className={`${styles.progressDot} ${activeIndustry === index ? styles.active : ''}`}
              onClick={() => setActiveIndustry(index)}
              style={{ '--color': ['#00d4ff', '#ff006e', '#8338ec', '#ffbe0b'][index % 4] }}
            >
              <span className={styles.dotLabel}>{industry.name}</span>
            </button>
          ))}
        </div>

        {/* Data Visualization */}
        <div className={styles.dataVisualization}>
          <div className={styles.dataHeader}>
            <span className={styles.dataTitle}>
              {ingles ? "Performance Metrics" : "Métricas de Rendimiento"}
            </span>
          </div>
          
          <div className={styles.dataGrid}>
            {Array.from({ length: 8 }, (_, i) => (
              <div 
                key={i}
                className={styles.dataBar}
                style={{ 
                  '--height': `${30 + Math.random() * 60}%`,
                  '--color': ['#00d4ff', '#ff006e', '#8338ec', '#ffbe0b'][i % 4],
                  '--delay': `${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className={styles.bottomGradient}></div>
    </section>
  );
};

export default NosotrosSeccion4;
