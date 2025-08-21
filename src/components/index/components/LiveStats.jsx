import React, { useState, useEffect } from 'react';
import styles from '../css/liveStats.module.css';

const LiveStats = () => {
  const [stats, setStats] = useState({
    projectsCompleted: 0,
    clientsSatisfied: 0,
    linesOfCode: 0,
    systemUptime: 0
  });

  const finalStats = {
    projectsCompleted: 150,
    clientsSatisfied: 98,
    linesOfCode: 2500000,
    systemUptime: 99.9
  };

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      if (currentStep <= steps) {
        const progress = currentStep / steps;
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);

        setStats({
          projectsCompleted: Math.floor(finalStats.projectsCompleted * easeOutCubic),
          clientsSatisfied: Math.floor(finalStats.clientsSatisfied * easeOutCubic),
          linesOfCode: Math.floor(finalStats.linesOfCode * easeOutCubic),
          systemUptime: parseFloat((finalStats.systemUptime * easeOutCubic).toFixed(1))
        });

        currentStep++;
      } else {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  const statItems = [
    {
      value: stats.projectsCompleted,
      label: 'Proyectos Completados',
      icon: '🚀',
      suffix: '+',
      color: '#4a90e2'
    },
    {
      value: stats.clientsSatisfied,
      label: 'Satisfacción del Cliente',
      icon: '⭐',
      suffix: '%',
      color: '#60bed7'
    },
    {
      value: formatNumber(stats.linesOfCode),
      label: 'Líneas de Código',
      icon: '💻',
      suffix: '+',
      color: '#375beb'
    },
    {
      value: stats.systemUptime,
      label: 'System Uptime',
      icon: '⚡',
      suffix: '%',
      color: '#4a90e2'
    }
  ];

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsHeader}>
        <h3 className={styles.statsTitle}>
          <span className={styles.titleIcon}>📊</span>
          MÉTRICAS EN TIEMPO REAL
        </h3>
        <div className={styles.liveIndicator}>
          <div className={styles.liveDot}></div>
          <span>LIVE</span>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {statItems.map((stat, index) => (
          <div key={index} className={styles.statCard} style={{ '--delay': `${index * 0.1}s` }}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statContent}>
              <div className={styles.statValue} style={{ '--color': stat.color }}>
                {stat.value}{stat.suffix}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
            <div className={styles.statGlow} style={{ '--glow-color': stat.color }}></div>
            <div className={styles.statWave}></div>
          </div>
        ))}
      </div>

      {/* Neural Activity Monitor */}
      <div className={styles.neuralMonitor}>
        <div className={styles.monitorHeader}>
          <span>ACTIVIDAD NEURAL</span>
          <div className={styles.signalStrength}>
            <div className={styles.signalBar}></div>
            <div className={styles.signalBar}></div>
            <div className={styles.signalBar}></div>
            <div className={styles.signalBar}></div>
          </div>
        </div>
        <div className={styles.waveform}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={styles.waveBar} style={{ '--delay': `${i * 0.1}s` }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveStats;
