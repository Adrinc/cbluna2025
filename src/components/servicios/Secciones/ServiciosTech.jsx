import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import { serviciosTranslations } from '../../../data/translations_servicios';
import styles from '../css/serviciosTech.module.css';

const ServiciosTech = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? serviciosTranslations.en : serviciosTranslations.es;
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
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

  // Auto-rotate services
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % t.services.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [t.services.length]);

  return (
    <section 
      className={`${styles.servicesSection} ${isVisible ? styles.visible : ''}`}
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
          <span className={styles.sectionLabel}>Nuestras Especialidades</span>
          <h2 className={styles.sectionTitle}>
            Servicios <span className={styles.highlight}>Tecnológicos</span>
          </h2>
          <p className={styles.sectionDescription}>
            Soluciones digitales innovadoras para impulsar tu negocio al siguiente nivel
          </p>
        </div>

        {/* Services Grid */}
        <div className={styles.servicesGrid}>
          {t.services.map((service, index) => (
            <div
              key={index}
              className={`${styles.serviceCard} ${activeService === index ? styles.active : ''}`}
              onMouseEnter={() => setActiveService(index)}
              style={{ '--delay': `${index * 0.2}s` }}
            >
              {/* Background Image */}
              <div className={styles.cardBackground}>
                <img 
                  src={service.image} 
                  alt={service.title}
                  className={styles.backgroundImage}
                />
                <div className={styles.imageOverlay}></div>
              </div>

              {/* Service Icon */}
              <div className={styles.serviceIcon}>
                <span className={styles.iconSymbol}>{service.icon}</span>
                <div className={styles.iconGlow}></div>
              </div>

              {/* Card Content */}
              <div className={styles.cardContent}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>

                {/* Stats */}
                <div className={styles.statsContainer}>
                  {service.stats.map((stat, statIndex) => (
                    <div key={statIndex} className={styles.statItem}>
                      <div className={styles.statValue}>{stat.value}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Explore Button */}
                <button className={styles.exploreButton}>
                  <span>Explorar</span>
                  <div className={styles.buttonArrow}>→</div>
                </button>
              </div>

              {/* Tech Border */}
              <div className={styles.techBorder}></div>
            </div>
          ))}
        </div>

        {/* Service Navigation */}
        <div className={styles.serviceNavigation}>
          {t.services.map((service, index) => (
            <button
              key={index}
              className={`${styles.navDot} ${activeService === index ? styles.active : ''}`}
              onClick={() => setActiveService(index)}
            >
              <span className={styles.dotIcon}>{service.icon}</span>
              <span className={styles.dotLabel}>{service.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Tech Elements */}
      <div className={styles.floatingElements}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className={styles.floatingElement}
            style={{ 
              '--delay': `${i * 0.4}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`
            }}
          >
            {['<', '>', '{', '}', '[', ']', '(', ')', '=', '+'][i % 10]}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiciosTech;
