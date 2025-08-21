import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../../../data/translations';
import { isEnglish } from '../../../data/variables';
import { useStore } from '@nanostores/react';
import styles from '../css/techSolutions.module.css';

const TechSolutions = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? translations.en : translations.es;
  const [activeSolution, setActiveSolution] = useState('webDevelopment');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false); // Desktop: manual by default, Mobile: auto by default
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const solutions = [
    {
      id: 'webDevelopment',
      icon: '🌐',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      image: '/image/global/desarrollo_webs.jpg'
    },
    {
      id: 'mobileDevelopment',
      icon: '📱',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      image: '/image/global/desarrollo_movil.jfif'
    },
    {
      id: 'digitalMarketing',
      icon: '📊',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      image: '/image/global/marketing2.png'
    },
    {
      id: 'consulting',
      icon: '🔧',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      image: '/image/global/consultoria.jfif'
    }
  ];

  const subSolutions = t.solutions?.consulting?.subSolutions ? [
    { id: 'crm', icon: '👥', color: '#4a90e2' },
    { id: 'erp', icon: '⚙️', color: '#60bed7' },
    { id: 'finances', icon: '💰', color: '#50c878' },
    { id: 'accessControl', icon: '🔐', color: '#ff6b6b' },
    { id: 'warehouse', icon: '📦', color: '#ffa726' },
    { id: 'cms', icon: '📝', color: '#ab47bc' }
  ] : [];

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 968;
      setIsMobile(mobile);
      setAutoPlay(mobile); // Mobile: auto by default, Desktop: manual by default
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        setActiveSolution(prev => {
          const currentIndex = solutions.findIndex(sol => sol.id === prev);
          const nextIndex = (currentIndex + 1) % solutions.length;
          return solutions[nextIndex].id;
        });
      }, 8000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay]);

  const activeSolutionData = solutions.find(sol => sol.id === activeSolution);
  const solutionData = t.solutions?.[activeSolution];

  return (
    <div ref={containerRef} className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.particleField} />
        <div className={styles.neuralNetwork} />
        <div className={styles.scanlines} />
      </div>

      {/* Navigation Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⚡</span>
            <span className={styles.logoText}>SOLUTIONS</span>
          </div>
          
          {/* Autoplay Control */}
          <div className={styles.autoplayControl}>
            <button 
              className={`${styles.autoplayButton} ${autoPlay ? styles.active : ''}`}
              onClick={() => setAutoPlay(!autoPlay)}
              title={autoPlay ? "Desactivar cambio automático" : "Activar cambio automático"}
            >
              <span className={styles.autoplayIcon}>
                {autoPlay ? '⏸️' : '▶️'}
              </span>
              <span className={styles.autoplayText}>
                {autoPlay ? 'Manual' : 'Auto'}
              </span>
            </button>
          </div>
          
          <div className={styles.progressBar}>
            <div 
              className={styles.progress} 
              style={{ width: `${((solutions.findIndex(s => s.id === activeSolution) + 1) / solutions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className={styles.navigationList}>
          {solutions.map((solution, index) => (
            <button
              key={solution.id}
              className={`${styles.navItem} ${activeSolution === solution.id ? styles.active : ''}`}
              onClick={() => setActiveSolution(solution.id)}
              style={{ '--delay': `${index * 0.1}s` }}
            >
              <div className={styles.navIcon} style={{ background: solution.gradient }}>
                {solution.icon}
              </div>
              <div className={styles.navContent}>
                <span className={styles.navTitle}>
                  {t.solutions?.[solution.id]?.title || solution.id}
                </span>
                <span className={styles.navSubtitle}>
                  {t.solutions?.[solution.id]?.subtitle || ''}
                </span>
              </div>
              <div className={styles.navIndicator} />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🚀</span>
            <span>{t.solutions?.sectionTitle || 'SOLUTIONS'}</span>
          </div>
          <h1 className={styles.title}>
            <span className={styles.titlePrimary}>Portafolio Tecnológico</span>
          </h1>
          <p className={styles.description}>
            {t.solutions?.sectionDescription || 'Transform ideas into reality'}
          </p>
        </div>

        {/* Solution Details */}
        <div className={styles.solutionDisplay}>
          <div className={styles.solutionContent}>
            <div className={styles.solutionHeader}>
              <div className={styles.solutionIcon} style={{ background: activeSolutionData?.gradient }}>
                {activeSolutionData?.icon}
              </div>
              <div className={styles.solutionInfo}>
                <h2 className={styles.solutionTitle}>{solutionData?.title}</h2>
                <p className={styles.solutionSubtitle}>{solutionData?.subtitle}</p>
              </div>
            </div>

            <div className={styles.featuresList}>
              {solutionData?.features?.map((feature, index) => (
                <div key={index} className={styles.feature} style={{ '--delay': `${index * 0.1}s` }}>
                  <div className={styles.featureIcon}>✓</div>
                  <span className={styles.featureText}>{feature}</span>
                </div>
              ))}
            </div>

            {/* Info Cards for all solutions */}
            {solutionData?.infoCards && solutionData.infoCards.length > 0 && (
              <div className={styles.infoCards}>
                <h3 className={styles.infoCardsTitle}>Información Destacada</h3>
                <div className={styles.infoCardsGrid}>
                  {solutionData.infoCards.map((card, index) => (
                    <div 
                      key={index} 
                      className={styles.infoCard}
                      style={{ '--delay': `${index * 0.1}s` }}
                    >
                      <div className={styles.infoCardHeader}>
                        <h4 className={styles.infoCardTitle}>{card.title}</h4>
                        <div className={styles.infoCardMetric}>
                          <span className={styles.metricValue}>{card.metric}</span>
                          <span className={styles.metricLabel}>{card.metricLabel}</span>
                        </div>
                      </div>
                      <p className={styles.infoCardDesc}>{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-solutions for consulting */}
            {activeSolution === 'consulting' && subSolutions.length > 0 && (
              <div className={styles.subSolutions}>
                <h3 className={styles.subSolutionsTitle}>Soluciones Especializadas</h3>
                <div className={styles.subSolutionsGrid}>
                  {subSolutions.map((subSol, index) => (
                    <div 
                      key={subSol.id} 
                      className={styles.subSolutionCard}
                      style={{ '--delay': `${index * 0.1}s`, '--color': subSol.color }}
                    >
                      <div className={styles.subSolutionIcon} style={{ color: subSol.color }}>
                        {subSol.icon}
                      </div>
                      <h4 className={styles.subSolutionTitle}>
                        {t.solutions?.consulting?.subSolutions?.[subSol.id]?.title}
                      </h4>
                      <p className={styles.subSolutionDesc}>
                        {t.solutions?.consulting?.subSolutions?.[subSol.id]?.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.solutionVisual}>
            <div className={styles.visualContainer}>
              <div className={styles.imageFrame}>
                <img 
                  src={activeSolutionData?.image} 
                  alt={solutionData?.title}
                  className={styles.solutionImage}
                />
                <div className={styles.imageOverlay} style={{ background: activeSolutionData?.gradient }} />
              </div>
              
              {/* Floating Tech Elements */}
      {/*         <div className={styles.floatingElements}>
                <div className={styles.floatingElement} style={{ '--delay': '0s' }}>⚡</div>
                <div className={styles.floatingElement} style={{ '--delay': '1s' }}>🔮</div>
                <div className={styles.floatingElement} style={{ '--delay': '2s' }}>💎</div>
                <div className={styles.floatingElement} style={{ '--delay': '3s' }}>🚀</div>
              </div> */}

              {/* Data Streams */}
              <div className={styles.dataStreams}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={styles.dataStream} style={{ '--delay': `${i * 0.3}s` }}>
                    <div className={styles.dataPacket} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Holographic Interface */}
      <div className={styles.holographicInterface}>
        <div className={styles.holoGrid} />
        <div className={styles.holoRings}>
          <div className={styles.holoRing} />
          <div className={styles.holoRing} />
          <div className={styles.holoRing} />
        </div>
      </div>
    </div>
  );
};

export default TechSolutions;
