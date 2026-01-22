import React, { useRef, useEffect, useState } from 'react';
import { isEnglish } from '../../../data/variables';
import { nosotrosTranslations } from '../../../data/translations_nosotros';
import { useStore } from '@nanostores/react';
import styles from '../css/nosotrosSeccion5.module.css';

const NosotrosSeccion5 = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? nosotrosTranslations.en : nosotrosTranslations.es;
  const sectionRef = useRef(null);
  const [visibleElements, setVisibleElements] = useState([]);
  const [activeParticle, setActiveParticle] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add(styles.visible);
          
          // Animate elements sequentially
          const elements = ['header', 'content', 'stats', 'cta'];
          elements.forEach((element, index) => {
            setTimeout(() => {
              setVisibleElements(prev => [...prev, element]);
            }, 400 * (index + 1));
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Particle animation cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveParticle(prev => (prev + 1) % 6);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleContactClick = () => {
    window.location.href = '/contacto';
  };

  return (
    <section id="final-cta" className={styles.ctaSection} ref={sectionRef}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.cosmicField}></div>
        <div className={styles.energyWaves}></div>
        <div className={styles.digitalMatrix}></div>
        <div className={styles.holographicGrid}></div>
      </div>

      {/* Floating Particles */}
      <div className={styles.particleSystem}>
        {Array.from({ length: 20 }, (_, i) => (
          <div 
            key={i}
            className={`${styles.particle} ${activeParticle === i % 6 ? styles.active : ''}`}
            style={{
              '--delay': `${i * 0.8}s`,
              '--x': `${10 + i * 4}%`,
              '--y': `${20 + (i % 4) * 20}%`,
              '--size': `${4 + (i % 3) * 2}px`,
              '--color': ['#00d4ff', '#ff006e', '#8338ec', '#ffbe0b', '#00ff88', '#ff4081'][i % 6]
            }}
          ></div>
        ))}
      </div>

      {/* Orbital Elements */}
      <div className={styles.orbitalSystem}>
        <div className={styles.centralCore}>
          <div className={styles.coreGlow}></div>
          <div className={styles.coreSymbol}>🚀</div>
        </div>
        
        {Array.from({ length: 3 }, (_, i) => (
          <div 
            key={i}
            className={styles.orbitRing}
            style={{ 
              '--size': `${200 + i * 100}px`,
              '--duration': `${10 + i * 5}s`,
              '--delay': `${i * 2}s`
            }}
          >
            <div className={styles.orbitParticle}></div>
          </div>
        ))}
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={`${styles.sectionHeader} ${visibleElements.includes('header') ? styles.visible : ''}`}>
          <div className={styles.headerBadge}>
            <div className={styles.badgeIcon}>✨</div>
            <span className={styles.badgeText}>
              {ingles ? "Ready to Transform?" : "¿Listo para Transformar?"}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className={`${styles.mainContent} ${visibleElements.includes('content') ? styles.visible : ''}`}>
          <h2 className={styles.ctaTitle}>
            <span className={styles.titleLine1}>{t.cta.title}</span>
            <span className={styles.titleHighlight}>{t.cta.highlight}</span>
          </h2>
          
          <p className={styles.ctaDescription}>
            {t.cta.description}
          </p>

          {/* Feature Points */}
          <div className={styles.featurePoints}>
            {[
              {
                icon: '⚡',
                title: ingles ? 'Lightning Fast' : 'Velocidad Relámpago',
                desc: ingles ? 'Rapid development and deployment' : 'Desarrollo y despliegue rápido'
              },
              {
                icon: '🎯',
                title: ingles ? 'Precision Focus' : 'Enfoque Preciso',
                desc: ingles ? 'Tailored solutions for your needs' : 'Soluciones adaptadas a tus necesidades'
              },
              {
                icon: '🔮',
                title: ingles ? 'Future-Ready' : 'Listo para el Futuro',
                desc: ingles ? 'Cutting-edge technology stack' : 'Stack tecnológico de vanguardia'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={styles.featurePoint}
                style={{ '--delay': `${index * 0.2}s` }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <div className={styles.featureContent}>
                  <h4 className={styles.featureTitle}>{feature.title}</h4>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className={`${styles.statsContainer} ${visibleElements.includes('stats') ? styles.visible : ''}`}>
          <div className={styles.statsGrid}>
            {[
              { value: t.stats.experience, label: t.stats.experienceLabel, color: '#00d4ff' },
              { value: t.stats.projects, label: t.stats.projectsLabel, color: '#ff006e' },
              { value: t.stats.clients, label: t.stats.clientsLabel, color: '#8338ec' },
              { value: t.stats.technologies, label: t.stats.technologiesLabel, color: '#ffbe0b' }
            ].map((stat, index) => (
              <div 
                key={index}
                className={styles.statCard}
                style={{ 
                  '--delay': `${index * 0.15}s`,
                  '--color': stat.color
                }}
              >
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statGlow}></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button Section */}
        <div className={`${styles.ctaButtonSection} ${visibleElements.includes('cta') ? styles.visible : ''}`}>
          <button 
            className={styles.ctaButton}
            onClick={handleContactClick}
          >
            <div className={styles.buttonInner}>
              <span className={styles.buttonText}>{t.cta.buttonText}</span>
              <div className={styles.buttonIcon}>→</div>
            </div>
            
            {/* Button Effects */}
            <div className={styles.buttonGlow}></div>
            <div className={styles.buttonRipple}></div>
            
            {/* Particles around button */}
            <div className={styles.buttonParticles}>
              {Array.from({ length: 8 }, (_, i) => (
                <div 
                  key={i}
                  className={styles.buttonParticle}
                  style={{ '--rotation': `${i * 45}deg` }}
                ></div>
              ))}
            </div>
          </button>

          {/* Additional CTA Text */}
          <p className={styles.ctaSubtext}>
            {ingles 
              ? "Join the companies that trust us to drive their digital transformation" 
              : "Únete a las empresas que confían en nosotros para impulsar su transformación digital"
            }
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className={styles.contactInfo}>
          {[
            {
              icon: '💬',
              title: ingles ? 'Start a Conversation' : 'Inicia una Conversación',
              desc: ingles ? 'Tell us about your project' : 'Cuéntanos sobre tu proyecto'
            },
            {
              icon: '🎨',
              title: ingles ? 'Custom Design' : 'Diseño Personalizado',
              desc: ingles ? 'Tailored to your brand' : 'Adaptado a tu marca'
            },
            {
              icon: '🚀',
              title: ingles ? 'Launch Together' : 'Lanzar Juntos',
              desc: ingles ? 'From concept to reality' : 'De concepto a realidad'
            }
          ].map((info, index) => (
            <div 
              key={index}
              className={styles.contactCard}
              style={{ '--delay': `${index * 0.1}s` }}
            >
              <div className={styles.cardIcon}>{info.icon}</div>
              <h5 className={styles.cardTitle}>{info.title}</h5>
              <p className={styles.cardDesc}>{info.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Tech Symbols */}
      <div className={styles.techSymbols}>
        {['{ }', '</>', 'AI', 'UX', 'API', 'DB'].map((symbol, index) => (
          <div 
            key={index}
            className={styles.techSymbol}
            style={{
              '--delay': `${index * 3}s`,
              '--x': `${15 + index * 12}%`,
              '--y': `${10 + (index % 3) * 30}%`
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      {/* Bottom Transition */}
      <div className={styles.bottomTransition}></div>
    </section>
  );
};

export default NosotrosSeccion5;
