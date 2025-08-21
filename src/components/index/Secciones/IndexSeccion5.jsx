import React, { useRef, useEffect, useState, useMemo } from "react";
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import { translations } from '../../../data/translations';
import styles from '../css/indexSeccion5.module.css';

const IndexSeccion5 = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? translations.en : translations.es;
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedBars, setAnimatedBars] = useState(false);
  const [currentMetric, setCurrentMetric] = useState(0);

  // Memoized progress data for performance
  const progressData = useMemo(() => [
    {
      key: 'clientes_satisfechos',
      percent: 96,
      icon: '👥',
      color: '#4a90e2',
      gradient: 'linear-gradient(135deg, #4a90e2, #60bed7)',
      target: '500+',
      label: 'Clients'
    },
    {
      key: 'retencion_clientes',
      percent: 95,
      icon: '🔄',
      color: '#6c5ce7',
      gradient: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
      target: '95%',
      label: 'Retention'
    },
    {
      key: 'cumplimiento_tiempos',
      percent: 90,
      icon: '⚡',
      color: '#00cec9',
      gradient: 'linear-gradient(135deg, #00cec9, #55efc4)',
      target: '24/7',
      label: 'Delivery'
    },
    {
      key: 'aumento_ingresos',
      percent: 92,
      icon: '📈',
      color: '#fd79a8',
      gradient: 'linear-gradient(135deg, #fd79a8, #fdcb6e)',
      target: '300%',
      label: 'Growth'
    },
  ], []);

  // Memoized tech stats for performance
  const techStats = useMemo(() => [
    { label: 'AI Models', value: '50+', icon: '🤖' },
    { label: 'Cloud Services', value: '99.9%', icon: '☁️' },
    { label: 'Data Processed', value: '10TB+', icon: '💾' },
    { label: 'Security Level', value: 'A+', icon: '🔒' }
  ], []);

  // Performance optimized intersection observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          section.classList.add(styles.visible);
          
          // Delay progress bar animation for better performance
          setTimeout(() => setAnimatedBars(true), 500);
          
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate metrics display
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentMetric(prev => (prev + 1) % progressData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, progressData.length]);

  return (
    <section 
      id="stats_section" 
      className={styles.section} 
      ref={sectionRef}
    >
      {/* Advanced Background Layers */}
      <div className={styles.backgroundLayers}>
        <div className={styles.neuralNetwork}></div>
        <div className={styles.dataStream}></div>
        <div className={styles.holographicGrid}></div>
        <div className={styles.particleField}></div>
      </div>

      {/* Floating Data Nodes */}
      <div className={styles.dataNodes}>
        {Array.from({ length: 12 }, (_, i) => (
          <div 
            key={i}
            className={styles.dataNode}
            style={{
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--delay': `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Connection Lines */}
      <div className={styles.connectionNetwork}>
        {Array.from({ length: 8 }, (_, i) => (
          <div 
            key={i}
            className={styles.connectionLine}
            style={{ '--delay': `${i * 0.5}s` }}
          />
        ))}
      </div>

      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headerBadge}>
            <div className={styles.badgeIcon}>📊</div>
            <span className={styles.badgeText}>Performance Analytics</span>
          </div>
          
          <h1 className={styles.mainTitle}>
            <span className={styles.titleAccent}>{t.stats.title1}</span>
            <br />
            {t.stats.title2} <span className={styles.gradientText}>{t.stats.title3}</span> {t.stats.title4}
          </h1>
          
          <p className={styles.mainSubtitle}>{t.stats.description}</p>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          {/* Left Side - Visual Dashboard */}
          <div className={styles.statsLeft}>
            <div className={styles.dashboardContainer}>
              {/* Main Image with Holographic Frame */}
              <div className={styles.imageContainer}>
                <img 
                  src="/image/global/71.jpg" 
                  alt={t.stats.altImg} 
                  className={styles.statsImage}
                  loading="lazy"
                />
                <div className={styles.holographicFrame}></div>
                <div className={styles.scanLine}></div>
              </div>

              {/* Floating Experience Badge */}
              <div className={styles.experienceTag}>
                <div className={styles.tagIcon}>⚡</div>
                <div className={styles.tagContent}>
                  <span className={styles.tagLabel}>Experience</span>
                  <span className={styles.tagValue}>{t.stats.experienceTag}</span>
                </div>
              </div>

              {/* Real-time Metrics Display */}
              <div className={styles.metricsDisplay}>
                <div className={styles.currentMetric}>
                  <div className={styles.metricIcon}>
                    {progressData[currentMetric]?.icon}
                  </div>
                  <div className={styles.metricInfo}>
                    <div className={styles.metricValue}>
                      {progressData[currentMetric]?.target}
                    </div>
                    <div className={styles.metricLabel}>
                      {progressData[currentMetric]?.label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stats Mini Cards */}
              <div className={styles.techStats}>
                {techStats.map((stat, index) => (
                  <div 
                    key={stat.label}
                    className={styles.techStat}
                    style={{ '--delay': `${index * 0.1}s` }}
                  >
                    <span className={styles.techIcon}>{stat.icon}</span>
                    <div className={styles.techData}>
                      <div className={styles.techValue}>{stat.value}</div>
                      <div className={styles.techLabel}>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Progress Analytics */}
          <div className={styles.statsRight}>
            {/* Progress Bars with Advanced Animation */}
            <div className={styles.progressSection}>
              <div className={styles.progressHeader}>
                <h3>Performance Metrics</h3>
                <div className={styles.progressIndicator}>
                  <span className={styles.pulsingDot}></span>
                  <span>Live Data</span>
                </div>
              </div>

              <div className={styles.progressBars}>
                {progressData.map((item, index) => (
                  <div 
                    className={styles.progressItem} 
                    key={item.key}
                    style={{ '--index': index }}
                  >
                    <div className={styles.progressHeader}>
                      <div className={styles.progressLabel}>
                        <span className={styles.progressIcon}>{item.icon}</span>
                        <span className={styles.progressTitle}>
                          {t.stats.progress[item.key]}
                        </span>
                      </div>
                      <div className={styles.progressPercentage}>
                        <span className={styles.percentValue}>{item.percent}</span>
                        <span className={styles.percentSymbol}>%</span>
                      </div>
                    </div>
                    
                    <div className={styles.progressBarContainer}>
                      <div className={styles.progressBar}>
                        <div 
                          className={`${styles.progressFilled} ${animatedBars ? styles.animated : ''}`}
                          style={{ 
                            '--width': `${item.percent}%`,
                            '--gradient': item.gradient,
                            '--delay': `${index * 0.2}s`
                          }}
                        />
                        <div className={styles.progressGlow}></div>
                      </div>
                      <div className={styles.progressTracker}>
                        <div className={styles.trackerDot}></div>
                      </div>
                    </div>

                    {/* Individual metric visualization */}
                    <div className={styles.metricVisualization}>
                      <div className={styles.visualizationBars}>
                        {Array.from({ length: 5 }, (_, i) => (
                          <div 
                            key={i}
                            className={styles.visualBar}
                            style={{ 
                              '--height': `${Math.random() * item.percent + 20}%`,
                              '--delay': `${i * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Performance Insights */}
            <div className={styles.performanceInsights}>
              <div className={styles.insightCard}>
                <div className={styles.insightIcon}>🎯</div>
                <div className={styles.insightContent}>
                  <h4>Precision Delivery</h4>
                  <p>Every project delivered with exceptional quality and timing precision</p>
                </div>
              </div>
              
              <div className={styles.insightCard}>
                <div className={styles.insightIcon}>🚀</div>
                <div className={styles.insightContent}>
                  <h4>Innovation Drive</h4>
                  <p>Constantly pushing boundaries with cutting-edge technology solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Achievement Section */}
        <div className={styles.achievementSection}>
          <div className={styles.achievementGrid}>
            <div className={styles.achievement}>
              <div className={styles.achievementNumber}>10+</div>
              <div className={styles.achievementLabel}>Years Experience</div>
            </div>
            <div className={styles.achievement}>
              <div className={styles.achievementNumber}>500+</div>
              <div className={styles.achievementLabel}>Projects Delivered</div>
            </div>
            <div className={styles.achievement}>
              <div className={styles.achievementNumber}>50+</div>
              <div className={styles.achievementLabel}>Technologies</div>
            </div>
            <div className={styles.achievement}>
              <div className={styles.achievementNumber}>24/7</div>
              <div className={styles.achievementLabel}>Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexSeccion5;
