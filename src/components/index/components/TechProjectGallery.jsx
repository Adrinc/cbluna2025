import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../../../data/translations';
import { proyectosTranslations } from '../../../data/translations_proyectos';
import { isEnglish } from '../../../data/variables';
import { useStore } from '@nanostores/react';
import styles from '../css/techProjectGallery.module.css';

// Datos por defecto de proyectos
const defaultProjects = [
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

const TechProjectGallery = ({ projects = defaultProjects, onProjectSelect }) => {
  const ingles = useStore(isEnglish);
  const t = ingles ? translations.en : translations.es;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const categories = [
    { id: 'all', label: ingles ? 'All' : 'Todos', icon: '⚡' },
    { id: 'web', label: 'Web', icon: '🌐' },
    { id: 'mobile', label: ingles ? 'Mobile' : 'Móvil', icon: '📱' },
    { id: 'ai', label: ingles ? 'AI & ML' : 'IA & ML', icon: '🤖' },
    { id: 'blockchain', label: 'Blockchain', icon: '⛓️' },
    { id: 'iot', label: 'IoT', icon: '🔗' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    let hasAnimated = false;
    if (!container) return;
    
    // Fallback para móviles: activar automáticamente después de un retraso
    const fallbackTimer = setTimeout(() => {
      if (!hasAnimated) {
        setIsVisible(true);
        hasAnimated = true;
      }
    }, 800);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          clearTimeout(fallbackTimer);
          setIsVisible(true);
          hasAnimated = true;
          observer.disconnect();
        }
      },
      { 
        threshold: window.innerWidth <= 768 ? 0.05 : 0.3,
        rootMargin: '100px 0px -50px 0px'
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Mapeo de keys a títulos para encontrar proyectos en translations_proyectos
  const keyToTitleMap = {
    'codigo_barras': 'sistema pos',
    'gestion_flotas': 'gestión de flotas',
    'crm': 'crm',
    'facturacion': 'operaciones financieras',
    'inventario': 'inventarios',
    'recursos_humanos': 'recursos humanos',
    'diseñosweb': 'sitios web',
    'gestion_venta': 'gestión de venta',
    'gestion_videos': 'gestor de contenido multimedia',
    'content_manager': 'gestor de contenido multimedia',
    'control_visitas': 'gestión de visitas',
    'compras': 'compras',
    'control_evento': 'control de eventos',
    'dashboards': 'dashboards',
    'mdf_idf': 'mdf / idf',
    'uwifi': 'control operativo',
    'ojociudadano': 'reportes inteligentes'
  };

  // Agregar información de traducción a cada proyecto
  const proyectosList = ingles ? proyectosTranslations.en : proyectosTranslations.es;
  const enhancedProjects = filteredProjects.map(project => {
    const info = t.projectsCarrusel?.[project.key] || {};
    
    // Buscar el proyecto completo en proyectosTranslations usando el mapeo
    const searchTitle = keyToTitleMap[project.key] || project.key.replace(/_/g, ' ');
    const fullProjectInfo = proyectosList.find(p => {
      return p.titulo.toLowerCase().includes(searchTitle.toLowerCase()) || 
             searchTitle.toLowerCase().includes(p.titulo.toLowerCase());
    });
    
    return {
      ...project,
      titulo: info.titulo || project.key,
      subtitulo: info.subtitulo || 'Solución tecnológica avanzada',
      demoUrl: fullProjectInfo?.demoUrl
    };
  });

  const handleProjectClick = (project) => {
    if (project.demoUrl) {
      window.location.href = project.demoUrl;
    }
    if (onProjectSelect) {
      onProjectSelect(project);
    }
  };

  return (
    <div ref={containerRef} className={`${styles.galleryContainer} ${isVisible ? styles.visible : ''}`}>
      {/* Background Effects */}
      <div className={styles.backgroundGrid}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className={styles.gridCell} style={{ '--delay': `${i * 0.1}s` }} />
        ))}
      </div>

      {/* Neural Network Background */}
      <div className={styles.neuralNetwork}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={styles.neuralNode} style={{ 
            '--x': `${Math.random() * 100}%`, 
            '--y': `${Math.random() * 100}%`,
            '--delay': `${i * 0.2}s`
          }} />
        ))}
      </div>

      {/* Category Filters */}
      <div className={styles.categoryFilters}>
        <div className={styles.filterTitle}>
          <span className={styles.filterIcon}>🔍</span>
          {ingles ? 'TECHNOLOGY CATEGORIES' : 'CATEGORÍAS TECNOLÓGICAS'}
        </div>
        <div className={styles.filterButtons}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.filterButton} ${selectedCategory === category.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span className={styles.categoryLabel}>{category.label}</span>
              <div className={styles.buttonGlow}></div>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className={styles.projectsGrid}>
        {enhancedProjects.map((project, index) => (
          <div
            key={project.key}
            className={`${styles.projectCard} ${hoveredProject === project.key ? styles.hovered : ''} ${project.demoUrl ? styles.hasDemo : ''}`}
            style={{ '--index': index }}
            onMouseEnter={() => setHoveredProject(project.key)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => handleProjectClick(project)}
          >
            {/* Card Background */}
            <div className={styles.cardBackground}>
              <img src={project.imagen} alt={project.titulo} className={styles.cardImage} />
              <div className={styles.cardOverlay}></div>
            </div>

            {/* Holographic Border */}
            <div className={styles.holographicBorder}></div>

            {/* Tech Icons */}
            <div className={styles.techIcons}>
              {project.technologies?.map((tech, i) => (
                <div key={i} className={styles.techIcon}>{tech}</div>
              ))}
            </div>

            {/* Card Content */}
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{project.titulo}</h3>
                <div className={styles.statusIndicator}>
                  <div className={styles.statusDot}></div>
                  <span>{ingles ? 'ACTIVE' : 'ACTIVO'}</span>
                </div>
              </div>
              
              <p className={styles.cardSubtitle}>{project.subtitulo}</p>
              
              <div className={styles.cardStats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>98%</span>
                  <span className={styles.statLabel}>Eficiencia</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>24/7</span>
                  <span className={styles.statLabel}>Uptime</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>AI</span>
                  <span className={styles.statLabel}>Powered</span>
                </div>
              </div>

              <div className={styles.cardActions}>
                <button className={styles.actionButton}>
                  <span>{project.demoUrl ? (ingles ? 'LIVE DEMO' : 'DEMO EN VIVO') : (ingles ? 'EXPLORE' : 'EXPLORAR')}</span>
                  <div className={styles.actionGlow}></div>
                </button>
              </div>
            </div>

            {/* Particle System */}
            <div className={styles.particleSystem}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={styles.particle} style={{ '--delay': `${i * 0.3}s` }} />
              ))}
            </div>

            {/* Scan Lines */}
            <div className={styles.scanLines}>
              <div className={styles.scanLine}></div>
              <div className={styles.scanLine}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Data Elements */}
      <div className={styles.floatingData}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={styles.dataElement} style={{
            '--x': `${Math.random() * 100}%`,
            '--y': `${Math.random() * 100}%`,
            '--delay': `${i * 0.5}s`
          }}>
            {['01010101', 'AI_CORE', 'DATA_STREAM', 'NEURAL_NET', 'QUANTUM_BIT'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechProjectGallery;
