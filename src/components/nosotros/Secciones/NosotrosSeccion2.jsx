import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import { nosotrosTranslations } from '../../../data/translations_nosotros';
import styles from '../css/nosotrosSeccion2.module.css';

const NosotrosSeccion2 = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? nosotrosTranslations.en : nosotrosTranslations.es;
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
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

  const features = [
    {
      icon: '👥',
      title: t.whyChooseUs.features[0].title,
      description: t.whyChooseUs.features[0].description,
      color: '#4682b4',
      gradient: 'linear-gradient(135deg, #4682b4, #87ceeb)',
      image: '/image/experience/telco.webp', // Usando imagen existente
      stats: [
        { value: '15+', label: 'Especialistas' },
        { value: '8+', label: 'Años Exp.' },
        { value: '99%', label: 'Calidad' }
      ]
    },
    {
      icon: '⚙️',
      title: t.whyChooseUs.features[1].title,
      description: t.whyChooseUs.features[1].description,
      color: '#5a9fd4',
      gradient: 'linear-gradient(135deg, #5a9fd4, #a2d2ff)',
      image: '/image/experience/financiero.jpg', // Usando imagen existente
      stats: [
        { value: '100%', label: 'Personalización' },
        { value: '24/7', label: 'Soporte' },
        { value: '150+', label: 'Proyectos' }
      ]
    },
    {
      icon: '🔧',
      title: t.whyChooseUs.features[2].title,
      description: t.whyChooseUs.features[2].description,
      color: '#6cb4ee',
      gradient: 'linear-gradient(135deg, #6cb4ee, #caf0f8)',
      image: '/image/experience/marketing.webp', // Usando imagen existente
      stats: [
        { value: '360°', label: 'Servicio' },
        { value: '98%', label: 'Satisfacción' },
        { value: '100+', label: 'Clientes' }
      ]
    }
  ];

  return (
    <section 
      className={`${styles.whyChooseSection} ${isVisible ? styles.visible : ''}`}
      ref={sectionRef}
    >
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.gridPattern}></div>
        <div className={styles.gradientOverlay}></div>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>{t.whyChooseUs.title}</span>
          <h2 className={styles.sectionTitle}>{t.whyChooseUs.subtitle}</h2>
          <p className={styles.sectionDescription}>
            {t.whyChooseUs.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${styles.featureCard} ${hoveredCard === index ? styles.hovered : ''}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ '--delay': `${index * 0.2}s` }}
            >
              {/* Background Image */}
              <div className={styles.cardBackground}>
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className={styles.backgroundImage}
                />
                <div className={styles.imageOverlay}></div>
              </div>

              {/* Status Badge */}
              <div className={styles.statusBadge}>
                <div className={styles.statusDot}></div>
                <span className={styles.statusText}>ACTIVO</span>
              </div>

              {/* Card Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconContainer}>
                    <span className={styles.icon}>{feature.icon}</span>
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                </div>

                <p className={styles.featureDescription}>{feature.description}</p>

                {/* Stats */}
                <div className={styles.statsContainer}>
                  {feature.stats.map((stat, statIndex) => (
                    <div key={statIndex} className={styles.statItem}>
                      <div className={styles.statValue}>{stat.value}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Explore Button */}
                <button className={styles.exploreButton}>
                  EXPLORAR
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats Summary */}
        <div className={styles.bottomStats}>
          <div className={styles.statSummaryItem}>
            <div className={styles.statNumber}>{t.stats.experience}</div>
            <div className={styles.statSummaryLabel}>{t.stats.experienceLabel}</div>
          </div>
          <div className={styles.statSummaryItem}>
            <div className={styles.statNumber}>{t.stats.projects}</div>
            <div className={styles.statSummaryLabel}>{t.stats.projectsLabel}</div>
          </div>
          <div className={styles.statSummaryItem}>
            <div className={styles.statNumber}>{t.stats.clients}</div>
            <div className={styles.statSummaryLabel}>{t.stats.clientsLabel}</div>
          </div>
          <div className={styles.statSummaryItem}>
            <div className={styles.statNumber}>{t.stats.technologies}</div>
            <div className={styles.statSummaryLabel}>{t.stats.technologiesLabel}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NosotrosSeccion2;
