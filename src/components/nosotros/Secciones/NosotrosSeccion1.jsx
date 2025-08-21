import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import { nosotrosTranslations } from '../../../data/translations_nosotros';
import styles from '../css/nosotrosSeccion1.module.css';

const NosotrosSeccion1 = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? nosotrosTranslations.en : nosotrosTranslations.es;
  const [isVisible, setIsVisible] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const sectionRef = useRef(null);

  const techWords = [
    'increíbles', 'innovadoras', 'revolucionarias', 'inteligentes', 'avanzadas'
  ];

  const englishWords = [
    'incredible', 'innovative', 'revolutionary', 'intelligent', 'advanced'
  ];

  const words = ingles ? englishWords : techWords;

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

  // Rotación de palabras
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section 
      className={`${styles.heroSection} ${isVisible ? styles.visible : ''}`}
      ref={sectionRef}
    >
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.particleField}></div>
        <div className={styles.neuralNetwork}></div>
        <div className={styles.scanLines}></div>
        <div className={styles.holographicGrid}></div>
      </div>

      {/* Floating Geometric Elements */}
      <div className={styles.geometricElements}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            className={styles.geometricShape}
            style={{ 
              '--delay': `${i * 0.5}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className={styles.heroContent}>
        <div className={styles.container}>
          {/* Tech Badge */}
          <div className={styles.techBadge}>
            <div className={styles.badgeIcon}>🚀</div>
            <span className={styles.badgeText}>TECHNOLOGY LEADERS</span>
            <div className={styles.badgeGlow}></div>
          </div>

          {/* Main Title */}
          <h1 className={styles.heroTitle}>
            <span className={styles.titleStatic}>{t.hero.title}</span>
          </h1>

          {/* Animated Subtitle */}
          <div className={styles.animatedSubtitle}>
            <span className={styles.subtitleStatic}>{t.hero.subtitle}</span>
            <span className={styles.subtitleAnimated}>
              {t.hero.highlight.split(' ').map((word, index) => (
                <span key={index} className={styles.word}>
                  {index === 1 ? (
                    <span className={styles.rotatingWord}>
                      {words.map((w, i) => (
                        <span
                          key={i}
                          className={`${styles.wordOption} ${
                            i === currentWordIndex ? styles.active : ''
                          }`}
                        >
                          {w}
                        </span>
                      ))}
                    </span>
                  ) : (
                    word
                  )}
                  {index < t.hero.highlight.split(' ').length - 1 && ' '}
                </span>
              ))}
            </span>
          </div>

          {/* Description */}
          <p className={styles.heroDescription}>
            {t.hero.description}
          </p>

          {/* Stats Grid */}
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>{t.stats.experience}</div>
              <div className={styles.statLabel}>{t.stats.experienceLabel}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>{t.stats.projects}</div>
              <div className={styles.statLabel}>{t.stats.projectsLabel}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>{t.stats.clients}</div>
              <div className={styles.statLabel}>{t.stats.clientsLabel}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>{t.stats.technologies}</div>
              <div className={styles.statLabel}>{t.stats.technologiesLabel}</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={styles.ctaButtons}>
            <button className={styles.primaryCta}>
              <span>Conocer Más</span>
              <div className={styles.buttonGlow}></div>
            </button>
            <button className={styles.secondaryCta}>
              <span>Ver Proyectos</span>
              <div className={styles.buttonIcon}>→</div>
            </button>
          </div>
        </div>

        {/* Visual Elements */}
        <div className={styles.visualContainer}>
          <div className={styles.techDisplay}>
            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                <div className={styles.codeDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className={styles.codeTitle}>innovation.js</span>
              </div>
              <div className={styles.codeContent}>
                <div className={styles.codeLine}>
                  <span className={styles.keyword}>const</span>
                  <span className={styles.variable}> future</span>
                  <span className={styles.operator}> = </span>
                  <span className={styles.function}>createInnovation</span>
                  <span className={styles.punctuation}>();</span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.keyword}>while</span>
                  <span className={styles.punctuation}>(</span>
                  <span className={styles.function}>success</span>
                  <span className={styles.punctuation}>()) {'{'}</span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.indent}>  </span>
                  <span className={styles.variable}>client</span>
                  <span className={styles.operator}>.</span>
                  <span className={styles.function}>transform</span>
                  <span className={styles.punctuation}>();</span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.punctuation}>{'}'}</span>
                </div>
              </div>
            </div>

            {/* Tech Icons */}
            <div className={styles.techIcons}>
              {['⚡', '🌐', '🤖', '💎', '🚀', '🔮'].map((icon, i) => (
                <div 
                  key={i} 
                  className={styles.techIcon}
                  style={{ '--delay': `${i * 0.2}s` }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Preview */}
          <div className={styles.devicePreview}>
            <div className={styles.phoneFrame}>
              <div className={styles.phoneScreen}>
                <img 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=600&fit=crop" 
                  alt="Mobile App Preview"
                  className={styles.appPreview}
                />
                <div className={styles.screenOverlay}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollText}>Scroll</div>
        <div className={styles.scrollLine}></div>
      </div>

      {/* Data Flow Animation */}
      <div className={styles.dataFlow}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className={styles.dataPacket}
            style={{ 
              '--delay': `${i * 0.3}s`,
              '--x': `${Math.random() * 100}%`
            }}
          >
            {['01', '10', '11', '00'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>
    </section>
  );
};

export default NosotrosSeccion1;
