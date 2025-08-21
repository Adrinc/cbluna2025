import React, { useRef, useEffect, useState, useMemo } from "react";
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import { translations } from '../../../data/translations';
import styles from '../css/indexSeccion4.module.css';

const IndexSeccion4 = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? translations.en : translations.es;
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Optimización: Memoizar las tarjetas para evitar re-renderizado innecesario
  const experienceCards = useMemo(() => [
    {
      id: 'telco',
      title: t.experienceSection.cards.carta_1_titulo,
      description: t.experienceSection.cards.carta_1_des,
      image: "./image/experience/telco.webp",
      icon: "📡",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      stats: { projects: "150+", countries: "5", uptime: "99.9%" }
    },
    {
      id: 'financiero',
      title: t.experienceSection.cards.carta_2_titulo,
      description: t.experienceSection.cards.carta_2_des,
      image: "./image/experience/financiero.jpg",
      icon: "💰",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      stats: { transactions: "1M+", security: "100%", compliance: "SOX" }
    },
    {
      id: 'marketing',
      title: t.experienceSection.cards.carta_3_titulo,
      description: t.experienceSection.cards.carta_3_des,
      image: "./image/experience/marketing.webp",
      icon: "📊",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      stats: { reach: "10M+", conversion: "25%", roi: "300%" }
    },
    {
      id: 'industria',
      title: t.experienceSection.cards.carta_4_titulo,
      description: t.experienceSection.cards.carta_4_des,
      image: "./image/experience/industria.jpg",
      icon: "⚙️",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      stats: { efficiency: "40%", automation: "85%", downtime: "0.1%" }
    }
  ], [t]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Desconectar después de activar para optimizar
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );
    
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="experience" 
      className={`${styles.section} ${isVisible ? styles.visible : ''}`} 
      ref={sectionRef}
    >
      {/* Advanced Background Effects */}
      <div className={styles.backgroundLayers}>
        <div className={styles.neuralNetwork} />
        <div className={styles.particleField} />
        <div className={styles.scanLines} />
        <div className={styles.holographicGrid} />
      </div>

      {/* Floating Geometric Elements */}
      <div className={styles.geometricElements}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.geometricShape} style={{ '--delay': `${i * 0.5}s` }} />
        ))}
      </div>

      <div className={styles.container}>
        {/* Enhanced Header */}
        <div className={styles.header}>
          <div className={styles.headerBadge}>
            <span className={styles.badgeIcon}>🚀</span>
            <span className={styles.badgeText}>EXPERIENCIA COMPROBADA</span>
          </div>
          
          <h1 className={styles.mainTitle}>
            <span className={styles.titleAccent}>{t.experienceSection.mainTitle}</span>
          </h1>
          
          <p className={styles.mainSubtitle}>
            {t.experienceSection.mainSubtitle}
          </p>

          {/* Innovation Metrics */}
          <div className={styles.innovationMetrics}>
            <div className={styles.metric}>
              <span className={styles.metricNumber}>20+</span>
              <span className={styles.metricLabel}>Años</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricNumber}>500+</span>
              <span className={styles.metricLabel}>Proyectos</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricNumber}>4</span>
              <span className={styles.metricLabel}>Industrias</span>
            </div>
          </div>
        </div>

        {/* Enhanced Experience Cards Grid */}
        <div className={styles.cardsGrid}>
          {experienceCards.map((card, index) => (
            <div
              key={card.id}
              className={`${styles.experienceCard} ${activeCard === card.id ? styles.active : ''}`}
              style={{ '--index': index, '--gradient': card.gradient }}
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Card Background with Advanced Effects */}
              <div className={styles.cardBackground}>
                <img 
                  src={card.image} 
                  alt={card.title}
                  className={styles.cardImage}
                  loading="lazy" // Performance optimization
                />
                <div className={styles.cardOverlay} />
                <div className={styles.cardGradient} style={{ background: card.gradient }} />
              </div>

              {/* Holographic Border */}
              <div className={styles.holoBorder} />

              {/* Tech Icon */}
              <div className={styles.cardIcon} style={{ background: card.gradient }}>
                {card.icon}
              </div>

              {/* Card Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <div className={styles.statusIndicator}>
                    <div className={styles.statusDot} />
                    <span>ACTIVO</span>
                  </div>
                </div>

                <p className={styles.cardDescription}>{card.description}</p>

                {/* Performance Stats */}
                <div className={styles.cardStats}>
                  {Object.entries(card.stats).map(([key, value], i) => (
                    <div key={key} className={styles.statItem}>
                      <span className={styles.statValue}>{value}</span>
                      <span className={styles.statLabel}>{key}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className={styles.cardAction}>
                  <button className={styles.actionButton}>
                    <span>EXPLORAR</span>
                    <div className={styles.buttonGlow} />
                  </button>
                </div>
              </div>

              {/* Animated Elements */}
              <div className={styles.cardParticles}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={styles.particle} style={{ '--delay': `${i * 0.2}s` }} />
                ))}
              </div>

              {/* Data Flow Lines */}
              <div className={styles.dataFlow}>
                <div className={styles.flowLine} />
                <div className={styles.flowLine} />
                <div className={styles.flowLine} />
              </div>
            </div>
          ))}
        </div>

        {/* Tech Enhancement Section */}
        <div className={styles.techEnhancement}>
          <div className={styles.enhancementGrid}>
            <div className={styles.enhancementCard}>
              <div className={styles.enhancementIcon}>🎯</div>
              <h4>Precisión Estratégica</h4>
              <p>Soluciones diseñadas específicamente para cada industria</p>
            </div>
            <div className={styles.enhancementCard}>
              <div className={styles.enhancementIcon}>⚡</div>
              <h4>Innovación Continua</h4>
              <p>Tecnologías de vanguardia en constante evolución</p>
            </div>
            <div className={styles.enhancementCard}>
              <div className={styles.enhancementIcon}>🛡️</div>
              <h4>Máxima Seguridad</h4>
              <p>Protocolos de seguridad empresarial nivel mundial</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Data Visualization */}
      <div className={styles.dataVisualization}>
        <div className={styles.dataNodes}>
          {Array.from({ length: 12 }).map((_, i) => (
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
        <div className={styles.dataConnections}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.connection} style={{ '--delay': `${i * 0.4}s` }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndexSeccion4;
































/* import React from "react";
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import { translations } from '../../../data/translations';
import RiveComponent from '../../global/animations/riveComponent';
import styles from '../css/indexSeccion4.module.css';

const IndexSeccion4 = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? translations.en : translations.es;
  return (
    <section id="experience" className={styles.sectionss}>
      <div className={styles.esfera}/>
      <div className={styles.gradientBackgroundTop}></div>
      <div className={styles.gradientBackgroundBottom}></div>
      <div className={`${styles.rivecomp} ${styles.web}`}>
        <RiveComponent
          src="/rive/cbluna.riv"
          artboard="seccion3"
          stateMachines="State Machine 1"
          autoplay={true}
          fit="fill"
          hastext={true}
          textValues={{
            MainTitle: t.experienceSection.mainTitle,
            MainSubtitle: t.experienceSection.mainSubtitle,
            carta_1_titulo: t.experienceSection.cards.carta_1_titulo,
            carta_1_des: t.experienceSection.cards.carta_1_des,
            carta_2_titulo: t.experienceSection.cards.carta_2_titulo,
            carta_2_des: t.experienceSection.cards.carta_2_des,
            carta_3_titulo: t.experienceSection.cards.carta_3_titulo,
            carta_3_des: t.experienceSection.cards.carta_3_des,
            carta_4_titulo: t.experienceSection.cards.carta_4_titulo,
            carta_4_des: t.experienceSection.cards.carta_4_des,
          }}
        />
      </div>
      <div className={`${styles.rivecomp} ${styles.movil}`}>
        <RiveComponent
          src="/rive/cbluna.riv"
          artboard="seccion3_mobile"
          stateMachines="State Machine 1"
          autoplay={true}
          fit="contain"
          hastext={true}
          textValues={{
            MainTitle: t.experienceSection.mainTitle,
            MainSubtitle: t.experienceSection.mainSubtitle,
          }}
        />
      </div>
      <div className={`${styles.rivecomp} ${styles.tablet}`}>
        <RiveComponent
          src="/rive/cbluna.riv"
          artboard="seccion3_tablet"
          stateMachines="State Machine 1"
          autoplay={true}
          fit="contain"
          hastext={true}
          textValues={{
            MainTitle: t.experienceSection.mainTitle,
            MainSubtitle: t.experienceSection.mainSubtitle,
          }}
        />
      </div>
    </section>
  );
};

export default IndexSeccion4;
 */

