import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import styles from '../css/techStackMobile.module.css';

// Datos de tecnologías organizados por categorías
const technologiesData = {
  languages: [
    { name: 'JavaScript', logo: '/image/logos/lf_javascript.png', color: '#F7DF1E' },
    { name: 'TypeScript', logo: '/image/logos/lf_typescript.png', color: '#3178C6' },
    { name: 'Python', logo: '/image/logos/lf_python.png', color: '#3776AB' },
    { name: 'Java', logo: '/image/logos/lf_java.png', color: '#ED8B00' },
    { name: 'Dart', logo: '/image/logos/lf_dart.png', color: '#0175C2' }
  ],
  frameworks: [
    { name: 'Next.js', logo: '/image/logos/lf_next.png', color: '#000000' },
    { name: 'Flutter', logo: '/image/logos/lf_flutter.png', color: '#02569B' },
    { name: 'Astro', logo: '/image/logos/lf_astro.png', color: '#FF5D01' },
    { name: 'Docker', logo: '/image/logos/docker.png', color: '#2496ED' },
    { name: 'Spark', logo: '/image/logos/spark.png', color: '#E25A1C' }
  ],
  databases: [
    { name: 'PostgreSQL', logo: '/image/logos/postgresql.png', color: '#336791' },
    { name: 'MySQL', logo: '/image/logos/mysql.png', color: '#4479A1' },
    { name: 'Oracle', logo: '/image/logos/oracle.png', color: '#F80000' },
    { name: 'SQLite', logo: '/image/logos/sqlite.png', color: '#003B57' },
    { name: 'IBM DB2', logo: '/image/logos/ibmDB2.png', color: '#054ADA' }
  ],
  cloud: [
    { name: 'AWS', logo: '/image/logos/aws-logo.png', color: '#FF9900' },
    { name: 'Azure', logo: '/image/logos/azure.png', color: '#0078D4' },
    { name: 'Google Cloud', logo: '/image/logos/google-cloud.png', color: '#4285F4' },
    { name: 'Cloudflare', logo: '/image/logos/cloudflare.png', color: '#F38020' },
    { name: 'Vercel', logo: '/image/logos/vercel-logo.png', color: '#000000' }
  ]
};

const categoryNames = {
  languages: { es: 'Lenguajes', en: 'Languages' },
  frameworks: { es: 'Frameworks', en: 'Frameworks' },
  databases: { es: 'Bases de Datos', en: 'Databases' },
  cloud: { es: 'Cloud & Servicios', en: 'Cloud & Services' }
};

const TechStackMobile = () => {
  const ingles = useStore(isEnglish);
  const [activeCategory, setActiveCategory] = useState('languages');
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTechs = technologiesData[activeCategory];
      setCurrentTechIndex((prev) => (prev + 1) % currentTechs.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeCategory]);

  const currentTech = technologiesData[activeCategory][currentTechIndex];

  return (
    <div ref={containerRef} className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
      {/* Background Effects */}
      <div className={styles.backgroundMatrix}>
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className={styles.matrixDot} style={{ '--delay': `${i * 0.05}s` }} />
        ))}
      </div>

      {/* Category Navigation */}
      <div className={styles.categoryNav}>
        {Object.keys(technologiesData).map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => {
              setActiveCategory(category);
              setCurrentTechIndex(0);
            }}
          >
            <span className={styles.categoryIcon}>
              {category === 'languages' && '💻'}
              {category === 'frameworks' && '🔧'}
              {category === 'databases' && '🗄️'}
              {category === 'cloud' && '☁️'}
            </span>
            <span className={styles.categoryLabel}>
              {categoryNames[category][ingles ? 'en' : 'es']}
            </span>
          </button>
        ))}
      </div>

      {/* Main Tech Display */}
      <div className={styles.techDisplay}>
        <div className={styles.techCard} key={`${activeCategory}-${currentTechIndex}`}>
          {/* Holographic Border */}
          <div className={styles.holographicBorder}></div>
          
          {/* Tech Logo */}
          <div className={styles.logoContainer}>
            <div className={styles.logoGlow} style={{ '--tech-color': currentTech.color }}></div>
            <img 
              src={currentTech.logo} 
              alt={currentTech.name}
              className={styles.techLogo}
            />
          </div>

          {/* Tech Info */}
          <div className={styles.techInfo}>
            <h3 className={styles.techName}>{currentTech.name}</h3>
            <div className={styles.techMeta}>
              <span className={styles.categoryBadge}>
                {categoryNames[activeCategory][ingles ? 'en' : 'es']}
              </span>
              <span className={styles.indexIndicator}>
                {currentTechIndex + 1} / {technologiesData[activeCategory].length}
              </span>
            </div>
          </div>

          {/* Particle System */}
          <div className={styles.particleSystem}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className={styles.particle} 
                style={{ 
                  '--delay': `${i * 0.2}s`,
                  '--color': currentTech.color
                }} 
              />
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className={styles.progressIndicators}>
          {technologiesData[activeCategory].map((_, index) => (
            <div
              key={index}
              className={`${styles.progressDot} ${index === currentTechIndex ? styles.active : ''}`}
              onClick={() => setCurrentTechIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Tech Grid Preview */}
      <div className={styles.techGrid}>
        {technologiesData[activeCategory].map((tech, index) => (
          <div
            key={tech.name}
            className={`${styles.miniCard} ${index === currentTechIndex ? styles.current : ''}`}
            onClick={() => setCurrentTechIndex(index)}
          >
            <img src={tech.logo} alt={tech.name} className={styles.miniLogo} />
            <span className={styles.miniName}>{tech.name}</span>
          </div>
        ))}
      </div>

      {/* Floating Data Streams */}
      <div className={styles.dataStreams}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.dataStream} style={{ '--index': i }}>
            <div className={styles.dataChunk}>01010101</div>
            <div className={styles.dataChunk}>TECH_STREAM</div>
            <div className={styles.dataChunk}>AI_CORE</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackMobile;
