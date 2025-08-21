import React, { useRef, useEffect, useState, useMemo } from 'react';
import styles from './ContactoSeccion.module.css';
import FormContact from '../react_components/FormContacto/FormContacto.jsx';
import { isEnglish } from '../../data/variables';
import { useStore } from '@nanostores/react';
import { contactoTranslations } from '../../data/translations_contacto';

const ContactoSeccion = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? contactoTranslations.en : contactoTranslations.es;
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  // Memoized trust indicators for performance
  const trustIndicators = useMemo(() => [
    { icon: '🔒', title: t.trustIndicators.secure.title, subtitle: t.trustIndicators.secure.subtitle },
    { icon: '⚡', title: t.trustIndicators.fast.title, subtitle: t.trustIndicators.fast.subtitle },
    { icon: '🎯', title: t.trustIndicators.precise.title, subtitle: t.trustIndicators.precise.subtitle },
    { icon: '🌐', title: t.trustIndicators.global.title, subtitle: t.trustIndicators.global.subtitle }
  ], [t]);

  // Memoized contact methods
  const contactMethods = useMemo(() => [
    {
      icon: '📧',
      title: t.contactMethods.email.title,
      value: t.contactMethods.email.value,
      description: t.contactMethods.email.description,
      color: '#4a90e2'
    },
    {
      icon: '📱',
      title: t.contactMethods.phone.title,
      value: t.contactMethods.phone.value,
      description: t.contactMethods.phone.description,
      color: '#6c5ce7'
    },
    {
      icon: '💬',
      title: t.contactMethods.chat.title,
      value: t.contactMethods.chat.value,
      description: t.contactMethods.chat.description,
      color: '#00cec9'
    },
    {
      icon: '📍',
      title: t.contactMethods.office.title,
      value: t.contactMethods.office.value,
      description: t.contactMethods.office.description,
      color: '#fd79a8'
    }
  ], [ingles]);

  // Performance optimized intersection observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          section.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate features
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % trustIndicators.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, trustIndicators.length]);

  return (
    <section id="Contacto" className={styles.section} ref={sectionRef}>
      {/* Advanced Background Layers */}
      <div className={styles.backgroundLayers}>
        <div className={styles.neuralNetwork}></div>
        <div className={styles.dataFlow}></div>
        <div className={styles.holographicGrid}></div>
        <div className={styles.particleSystem}></div>
      </div>

      {/* Floating Tech Elements */}
      <div className={styles.floatingElements}>
        {Array.from({ length: 8 }, (_, i) => (
          <div 
            key={i}
            className={styles.floatingElement}
            style={{
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--delay': `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Connection Lines */}
      <div className={styles.connectionNetwork}>
        {Array.from({ length: 6 }, (_, i) => (
          <div 
            key={i}
            className={styles.connectionLine}
            style={{ '--delay': `${i * 0.3}s` }}
          />
        ))}
      </div>

      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headerBadge}>
            <div className={styles.badgeIcon}>🚀</div>
            <span className={styles.badgeText}>{t.header.badge}</span>
          </div>
          
          <h1 className={styles.mainTitle}>
            <span className={styles.titleAccent}>{t.header.titleAccent}</span> {t.header.title}
          </h1>
          
          <p className={styles.mainSubtitle}>
            {t.header.subtitle}
          </p>

          {/* Trust Indicators */}
          <div className={styles.trustSection}>
            <div className={styles.trustGrid}>
              {trustIndicators.map((indicator, index) => (
                <div 
                  key={indicator.title}
                  className={`${styles.trustItem} ${index === currentFeature ? styles.active : ''}`}
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <div className={styles.trustIcon}>{indicator.icon}</div>
                  <div className={styles.trustContent}>
                    <div className={styles.trustTitle}>{indicator.title}</div>
                    <div className={styles.trustSubtitle}>{indicator.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={styles.contentGrid}>
          {/* Left Side - Contact Form */}
          <div className={styles.formSection}>
            <div className={styles.formContainer}>
              <div className={styles.formHeader}>
                <h2>{t.form.title}</h2>
                <p>{t.form.subtitle}</p>
              </div>
              <FormContact />
            </div>
          </div>

          {/* Right Side - Company Info & Contact Methods */}
          <div className={styles.infoSection}>
            {/* Company Showcase */}
            <div className={styles.companyShowcase}>
              <div className={styles.logoContainer}>
                <img src="./favicon.png" alt="CBLUNA Logo" className={styles.logo} />
                <div className={styles.logoGlow}></div>
              </div>
              
              <div className={styles.companyInfo}>
                <h2 className={styles.companyTitle}>{t.companyShowcase.title}</h2>
                <p className={styles.companyDescription}>{t.companyShowcase.description}</p>
                
                {/* Tech Stats */}
                <div className={styles.techStats}>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>{t.techStats.projects.number}</div>
                    <div className={styles.statLabel}>{t.techStats.projects.label}</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>{t.techStats.clients.number}</div>
                    <div className={styles.statLabel}>{t.techStats.clients.label}</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>{t.techStats.support.number}</div>
                    <div className={styles.statLabel}>{t.techStats.support.label}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className={styles.contactMethods}>
              <h3>{t.contactMethods.title}</h3>
              <div className={styles.methodsGrid}>
                {contactMethods.map((method, index) => (
                  <div 
                    key={method.title}
                    className={styles.contactMethod}
                    style={{ 
                      '--delay': `${index * 0.1}s`,
                      '--color': method.color
                    }}
                  >
                    <div className={styles.methodIcon}>{method.icon}</div>
                    <div className={styles.methodContent}>
                      <div className={styles.methodTitle}>{method.title}</div>
                      <div className={styles.methodValue}>{method.value}</div>
                      <div className={styles.methodDescription}>{method.description}</div>
                    </div>
                    <div className={styles.methodGlow}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Status */}
            <div className={styles.statusPanel}>
              <div className={styles.statusHeader}>
                <div className={styles.statusIndicator}>
                  <div className={styles.statusDot}></div>
                  <span>{t.systemStatus.title}</span>
                </div>
                <div className={styles.statusTime}>
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
              
              <div className={styles.statusGrid}>
                <div className={styles.statusItem}>
                  <span className={styles.statusLabel}>{t.systemStatus.responseTime.label}</span>
                  <span className={styles.statusValue}>{t.systemStatus.responseTime.value}</span>
                </div>
                <div className={styles.statusItem}>
                  <span className={styles.statusLabel}>{t.systemStatus.availability.label}</span>
                  <span className={styles.statusValue}>{t.systemStatus.availability.value}</span>
                </div>
                <div className={styles.statusItem}>
                  <span className={styles.statusLabel}>{t.systemStatus.security.label}</span>
                  <span className={styles.statusValue}>{t.systemStatus.security.value}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3>{t.cta.title}</h3>
            <p>{t.cta.subtitle}</p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryButton}>
                <span>{t.cta.scheduleCall}</span>
                <div className={styles.buttonGlow}></div>
              </button>
              <button className={styles.secondaryButton}>
                <span>{t.cta.viewPortfolio}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactoSeccion;
