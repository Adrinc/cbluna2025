import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import { nosotrosTranslations } from '../../../data/translations_nosotros';
import styles from '../css/nosotrosSeccion3.module.css';

const NosotrosSeccion3 = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? nosotrosTranslations.en : nosotrosTranslations.es;
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
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

  // Auto-rotate active section
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 4);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const companyData = [
    {
      title: t.company.mission.title,
      content: t.company.mission.content,
      icon: '🎯',
      type: 'mission'
    },
    {
      title: t.company.vision.title,
      content: t.company.vision.content,
      icon: '🔭',
      type: 'vision'
    },
    {
      title: t.company.values.title,
      content: t.company.values.list,
      icon: '💎',
      type: 'values'
    },
    {
      title: t.company.objectives.title,
      content: t.company.objectives.list,
      icon: '🚀',
      type: 'objectives'
    }
  ];

  return (
    <section 
      className={`${styles.companySection} ${isVisible ? styles.visible : ''}`}
      ref={sectionRef}
    >
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.gridPattern}></div>
        <div className={styles.gradientOverlay}></div>
      </div>

      <div className={styles.container}>
        {/* Left Content - Company Information */}
        <div className={styles.leftContent}>
          {/* Header */}
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>{t.company.slogan}</span>
            <h2 className={styles.sectionTitle}>
              {t.company.mainTitle} <span className={styles.highlight}>{t.company.mainHighlight}</span>
            </h2>
          </div>

          {/* Company Description */}
          <div className={styles.companyDescription}>
            <p className={styles.description}>{t.company.teamDescription}</p>
            
            {/* Industries List */}
            <div className={styles.industriesList}>
              <div className={styles.industriesGrid}>
                {t.company.industries.map((industry, index) => (
                  <div key={index} className={styles.industryItem}>
                    <div className={styles.industryIcon}>•</div>
                    <span>{industry}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className={styles.additionalInfo}>{t.company.additionalInfo}</p>
          </div>

          {/* Navigation Tabs */}
          <div className={styles.navigationTabs}>
            {companyData.map((item, index) => (
              <button
                key={index}
                className={`${styles.navTab} ${activeSection === index ? styles.active : ''}`}
                onClick={() => setActiveSection(index)}
              >
                <span className={styles.tabIcon}>{item.icon}</span>
                <span className={styles.tabTitle}>{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content - Active Section Details */}
        <div className={styles.rightContent}>
          <div className={styles.contentCard}>
            {/* Card Header */}
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <span className={styles.iconSymbol}>{companyData[activeSection].icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{companyData[activeSection].title}</h3>
            </div>

            {/* Card Content */}
            <div className={styles.cardBody}>
              {(activeSection === 2 || activeSection === 3) ? (
                // Values and Objectives - Show as list
                <div className={styles.listContent}>
                  {companyData[activeSection].content.map((item, index) => (
                    <div key={index} className={styles.listItem}>
                      <div className={styles.listIcon}>
                        {activeSection === 2 ? '⭐' : '🎯'}
                      </div>
                      <span className={styles.listText}>{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                // Mission and Vision - Show as paragraph
                <p className={styles.cardText}>{companyData[activeSection].content}</p>
              )}
            </div>

            {/* Progress Indicator */}
            <div className={styles.progressIndicator}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${((activeSection + 1) / 4) * 100}%` }}
                ></div>
              </div>
              <span className={styles.progressText}>
                {activeSection + 1} / 4
              </span>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className={styles.decorativeElements}>
            <div className={styles.floatingShape}></div>
            <div className={styles.techGrid}></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
  {/*     <div className={styles.statsSection}>
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
      </div> */}
    </section>
  );
};

export default NosotrosSeccion3;
