import { translations } from '../../../data/translations';
import { isEnglish } from '../../../data/variables';
import { useStore } from '@nanostores/react';
import TechProjectGallery from '../components/TechProjectGallery.jsx';
import LiveStats from '../components/LiveStats.jsx';
import { useRef, useEffect } from 'react';

import styles from '../css/indexSeccion3.module.css';

// Datos de proyectos con categorías
const projectsData = [
  { 
    key: 'codigo_barras', 
    imagen: '/image/carrusel_proyectos/codigo_barras.webp',
    category: 'web',
    technologies: ['📊', '🔍', '⚡']
  },
  { 
    key: 'compras', 
    imagen: '/image/carrusel_proyectos/compras.webp',
    category: 'web',
    technologies: ['💳', '🛒', '📈']
  },
  { 
    key: 'control_evento', 
    imagen: '/image/carrusel_proyectos/control_evento.webp',
    category: 'mobile',
    technologies: ['📅', '🎫', '👥']
  },
  { 
    key: 'control_visitas', 
    imagen: '/image/carrusel_proyectos/control_visitas.jpeg',
    category: 'iot',
    technologies: ['🏢', '🚪', '📋']
  },
  { 
    key: 'crm', 
    imagen: '/image/carrusel_proyectos/crm.webp',
    category: 'ai',
    technologies: ['🤝', '📊', '🎯']
  },
  { 
    key: 'dashboards', 
    imagen: '/image/carrusel_proyectos/dashboards.png',
    category: 'web',
    technologies: ['📊', '📈', '💡']
  },
  {     key: 'content_manager', 
    imagen: '/image/carrusel_proyectos/content_manager.png',
    category: 'web',
    technologies: ['📹', '🖼️', '📦']
  },
  {     key: 'diseñosweb', 
    imagen: '/image/carrusel_proyectos/diseñosweb.webp',
    category: 'web',
    technologies: ['🎨', '💻', '🌐']
  },
  { 
    key: 'facturacion', 
    imagen: '/image/carrusel_proyectos/facturacion.png',
    category: 'blockchain',
    technologies: ['💰', '📄', '🔐']
  },
  { 
    key: 'gestion_flotas', 
    imagen: '/image/carrusel_proyectos/gestion_flotas.webp',
    category: 'iot',
    technologies: ['🚛', '📍', '⚡']
  },
  { 
    key: 'inventario', 
    imagen: '/image/carrusel_proyectos/inventario.jpeg',
    category: 'ai',
    technologies: ['📦', '🤖', '📊']
  },
  { 
    key: 'recursos_humanos', 
    imagen: '/image/carrusel_proyectos/recursos_humanos.png',
    category: 'ai',
    technologies: ['👥', '🧠', '📈']
  },
  { 
    key: 'mdf_idf', 
    imagen: '/image/carrusel_proyectos/Nethive.png',
    category: 'web',
    technologies: ['🌐', '📡', '⚡']
  },
  { 
    key: 'uwifi', 
    imagen: '/image/carrusel_proyectos/uwifi.png',
    category: 'iot',
    technologies: ['📶', '5G', '🔗']
  },
  { 
    key: 'ojociudadano', 
    imagen: '/image/carrusel_proyectos/ojociudadano.png',
    category: 'ai',
    technologies: ['👁️', '🤖', '📱']
  }
];

const IndexSeccion3 = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? translations.en : translations.es;
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    let hasAnimated = false;
    if (!section) return;
    
    // Fallback para móviles: activar automáticamente después de un retraso
    const fallbackTimer = setTimeout(() => {
      if (!hasAnimated && section) {
        section.classList.add(styles.fadeInUp);
        hasAnimated = true;
      }
    }, 1000);
    
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          clearTimeout(fallbackTimer);
          section.classList.add(styles.fadeInUp);
          hasAnimated = true;
          observer.disconnect();
        }
      },
      { 
        threshold: window.innerWidth <= 768 ? 0.1 : 0.2,
        rootMargin: '50px 0px -50px 0px'
      }
    );
    
    observer.observe(section);
    
    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section id="our_adventages" className={styles.sections} ref={sectionRef}>
      {/* Advanced background effects */}
      <div className={styles.neuralNetwork} />
      <div className={styles.particleField} />
      <div className={styles.scanLines} />
      <div className={styles.gradientBackgroundTop}></div>
      <div className={styles.gradientBackgroundBottom}></div>

      <div className={styles.container}>
        {/* Enhanced header section */}
        <div className={styles.content}>
          <div className={styles.headerBadge}>
            <span className={styles.pulse} />
            <span className={styles.badgeText}>{ingles ? 'OUR SERVICES' : 'NUESTROS SERVICIOS'}</span>
          </div>
          <h1 className={styles.title}>
            <span className={styles.titleGlow}>{t.projectsTitle}</span>
          </h1>
          <h2 className={styles.subtitle}>
            <span className={styles.subtitleAccent}>{t.projectsSubtitle}</span>
          </h2>
          <div className={styles.titleDivider} />
        </div>

        {/* Live statistics component */}
        <LiveStats />

        {/* Tech project gallery */}
        <div className={styles.galleryContainer}>
          <TechProjectGallery 
            projects={projectsData}
          />
        </div>
      </div>


    </section>
  );
};

export default IndexSeccion3;
