import React, { useState, useEffect, useRef, useMemo } from "react";
import { isEnglish } from '../../../data/variables';
import { useStore } from '@nanostores/react';
import { proyectosTranslations } from '../../../data/translations_proyectos.js';
import styles from "./css/proyectosSeccion1.module.css";

const ProyectosSeccion1 = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? proyectosTranslations.en : proyectosTranslations.es;
  
  const [activeProject, setActiveProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(t);
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

  // Project categories for filtering
  const categories = useMemo(() => [
    { id: 'all', name: ingles ? 'All Projects' : 'Todos los Proyectos', icon: '🌟' },
    { id: 'web', name: ingles ? 'Web Development' : 'Desarrollo Web', icon: '🌐' },
    { id: 'systems', name: ingles ? 'Business Systems' : 'Sistemas Empresariales', icon: '⚙️' },
    { id: 'management', name: ingles ? 'Management Tools' : 'Herramientas de Gestión', icon: '📊' },
    { id: 'innovation', name: ingles ? 'Innovation' : 'Innovación', icon: '🚀' }
  ], [ingles]);

  // Enhanced project categorization
  const categorizeProject = (project) => {
    const title = project.titulo.toLowerCase();
    if (title.includes('web') || title.includes('sitio')) return 'web';
    if (title.includes('crm') || title.includes('facturación') || title.includes('inventario') || title.includes('recursos')) return 'systems';
    if (title.includes('gestión') || title.includes('dashboard') || title.includes('compras')) return 'management';
    if (title.includes('neo') || title.includes('u-wifi') || title.includes('ojo ciudadano')) return 'innovation';
    return 'systems';
  };

  // Filter projects based on active category
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(t);
    } else {
      setFilteredProjects(t.filter(project => categorizeProject(project) === activeFilter));
    }
    setActiveProject(0);
  }, [activeFilter, t]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance projects
  useEffect(() => {
    if (filteredProjects.length > 1) {
      intervalRef.current = setInterval(() => {
        setActiveProject(prev => (prev + 1) % filteredProjects.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [filteredProjects.length]);

  const handleProjectSelect = (index) => {
    setActiveProject(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleFilterChange = (filterKey) => {
    setActiveFilter(filterKey);
  };

  const currentProject = filteredProjects[activeProject] || filteredProjects[0];

  return (
    <section 
      className={`${styles.section} ${isVisible ? styles.visible : ''}`} 
      ref={sectionRef}
    >
      {/* Animated Background */}
      <div className={styles.backgroundEffects}>
        <div className={styles.particleField}></div>
        <div className={styles.neuralNetwork}></div>
        <div className={styles.scanlines}></div>
        <div className={styles.holographicGrid}></div>
      </div>

      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.badge}>
            <div className={styles.badgeIcon}>💼</div>
            <span>{ingles ? 'Portfolio' : 'Portafolio'}</span>
          </div>
          
          <h1 className={styles.title}>
            <span className={styles.titlePrimary}>
              {ingles ? 'Our' : 'Nuestros'}
            </span>
            <span className={styles.titleSecondary}>
              {ingles ? 'Projects' : 'Proyectos'}
            </span>
          </h1>
          
          <p className={styles.subtitle}>
            {ingles 
              ? 'Cutting-edge solutions that drive business transformation'
              : 'Soluciones de vanguardia que impulsan la transformación empresarial'
            }
          </p>
        </div>
      </div>

      {/* Filter Navigation */}
      <div className={styles.filterContainer}>
        <div className={styles.filterList}>
          {categories.map((category, index) => (
            <button
              key={category.id}
              className={`${styles.filterButton} ${activeFilter === category.id ? styles.active : ''}`}
              onClick={() => handleFilterChange(category.id)}
              style={{ '--delay': `${index * 0.1}s` }}
            >
              <span className={styles.filterIcon}>{category.icon}</span>
              <span className={styles.filterText}>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Project Showcase */}
        <div className={styles.projectShowcase}>
          <div className={styles.projectVisual}>
            <div className={styles.imageContainer}>
              <img 
                src={currentProject?.imagen} 
                alt={currentProject?.titulo}
                className={styles.projectImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                  console.warn('Error loading image:', currentProject?.imagen);
                }}
                loading="lazy"
              />
              <div className={styles.imageOverlay}></div>
              <div className={styles.techIndicators}>
                <div className={styles.indicator}>
                  <div className={styles.indicatorDot}></div>
                  <span>{ingles ? 'Active' : 'Activo'}</span>
                </div>
                <div className={styles.techBadge}>
                  <span>{ingles ? 'Production Ready' : 'Listo para Producción'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.projectInfo}>
            <div className={styles.projectHeader}>
              <h2 className={styles.projectTitle}>{currentProject?.titulo}</h2>
              <div className={styles.projectMeta}>
                <span className={styles.projectCategory}>
                  {categories.find(cat => cat.id === categorizeProject(currentProject || {}))?.name}
                </span>
                <div className={styles.projectStatus}>
                  <div className={styles.statusDot}></div>
                  <span>{ingles ? 'Deployed' : 'Desplegado'}</span>
                </div>
              </div>
            </div>

            <p className={styles.projectDescription}>
              {currentProject?.descripcion}
            </p>

            <div className={styles.featuresGrid}>
              {currentProject?.puntos.map((punto, index) => (
                <div 
                  key={index} 
                  className={styles.featureItem}
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <div className={styles.featureIcon}>✓</div>
                  <span className={styles.featureText}>{punto}</span>
                </div>
              ))}
            </div>

            <div className={styles.projectActions}>
              <button className={styles.primaryAction}>
                <span>{ingles ? 'View Details' : 'Ver Detalles'}</span>
                <div className={styles.actionIcon}>→</div>
              </button>
              <button className={styles.secondaryAction}>
                <span>{ingles ? 'Live Demo' : 'Demo en Vivo'}</span>
                <div className={styles.actionIcon}>🔗</div>
              </button>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className={styles.projectGrid}>
          <h3 className={styles.gridTitle}>
            {ingles ? 'Explore More Projects' : 'Explora Más Proyectos'}
          </h3>
          
          <div className={styles.gridContainer}>
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className={`${styles.projectCard} ${index === activeProject ? styles.activeCard : ''} ${hoveredCard === index ? styles.hoveredCard : ''}`}
                onClick={() => handleProjectSelect(index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className={styles.cardImage}>
                  <img 
                    src={project.imagen} 
                    alt={project.titulo}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      console.warn('Error loading image:', project.imagen);
                    }}
                    loading="lazy"
                  />
                  <div className={styles.cardOverlay}></div>
                </div>
                
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>{project.titulo}</h4>
                  <p className={styles.cardDescription}>
                    {project.descripcion.substring(0, 80)}...
                  </p>
                  
                  <div className={styles.cardFooter}>
                    <span className={styles.cardCategory}>
                      {categories.find(cat => cat.id === categorizeProject(project))?.icon}
                    </span>
                    <div className={styles.cardIndicator}>
                      <div className={styles.cardDot}></div>
                    </div>
                  </div>
                </div>

                <div className={styles.cardGlow}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${((activeProject + 1) / filteredProjects.length) * 100}%` }}
            ></div>
          </div>
          <span className={styles.progressText}>
            {activeProject + 1} / {filteredProjects.length}
          </span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h3 className={styles.ctaTitle}>
            {ingles ? 'Ready to Build Something Amazing?' : '¿Listo para Construir Algo Increíble?'}
          </h3>
          <p className={styles.ctaDescription}>
            {ingles 
              ? 'Let\'s discuss your next project and turn your vision into reality'
              : 'Hablemos de tu próximo proyecto y convirtamos tu visión en realidad'
            }
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.ctaPrimary}>
              <span>{ingles ? 'Start Project' : 'Iniciar Proyecto'}</span>
              <div className={styles.buttonGlow}></div>
            </button>
            <button className={styles.ctaSecondary}>
              <span>{ingles ? 'Contact Us' : 'Contáctanos'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProyectosSeccion1;
