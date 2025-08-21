import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import TechModal from './TechModal.jsx';
import TechTooltip from './TechTooltip.jsx';
import styles from '../css/techStackGrouped.module.css';

// Organización de tecnologías por categorías
const technologies = [
  // LENGUAJES DE PROGRAMACIÓN
  { 
    name: 'JavaScript', 
    logo: '/image/logos/lf_javascript.png', 
    color: '#F7DF1E',
    category: 'lenguaje',
    level: 'expert',
    descriptionES: 'JavaScript es el lenguaje fundamental del desarrollo web moderno. Dominamos todas sus características avanzadas incluyendo ES6+, async/await, módulos, y patrones de programación funcional para crear aplicaciones interactivas y dinámicas.',
    descriptionEN: 'JavaScript is the fundamental language of modern web development. We master all its advanced features including ES6+, async/await, modules, and functional programming patterns to create interactive and dynamic applications.',
    experience: '8+ años'
  },
  { 
    name: 'TypeScript', 
    logo: '/image/logos/lf_typescript.png', 
    color: '#3178C6',
    category: 'lenguaje',
    level: 'expert',
    descriptionES: 'TypeScript mejora JavaScript con tipado estático, proporcionando mayor seguridad y mantenibilidad. Utilizamos tipos avanzados, generics, decoradores y interfaces para crear arquitecturas robustas y escalables.',
    descriptionEN: 'TypeScript enhances JavaScript with static typing, providing greater safety and maintainability. We use advanced types, generics, decorators, and interfaces to create robust and scalable architectures.',
    experience: '6+ años'
  },
  { 
    name: 'Python', 
    logo: '/image/logos/lf_python.png', 
    color: '#3776AB',
    category: 'lenguaje',
    level: 'expert',
    descriptionES: 'Python es nuestra herramienta principal para IA, machine learning, análisis de datos y automatización. Dominamos frameworks como FastAPI, Django, y bibliotecas especializadas para ciencia de datos y desarrollo backend.',
    descriptionEN: 'Python is our main tool for AI, machine learning, data analysis, and automation. We master frameworks like FastAPI, Django, and specialized libraries for data science and backend development.',
    experience: '7+ años'
  },
  { 
    name: 'Java', 
    logo: '/image/logos/lf_java.png', 
    color: '#ED8B00',
    category: 'lenguaje',
    level: 'advanced',
    descriptionES: 'Java potencia aplicaciones empresariales críticas con su robustez y escalabilidad. Implementamos arquitecturas microservicios, sistemas distribuidos y aplicaciones de alto rendimiento usando Spring Boot y tecnologías enterprise.',
    descriptionEN: 'Java powers critical enterprise applications with its robustness and scalability. We implement microservices architectures, distributed systems, and high-performance applications using Spring Boot and enterprise technologies.',
    experience: '5+ años'
  },
  { 
    name: 'Dart', 
    logo: '/image/logos/lf_dart.png', 
    color: '#0175C2',
    category: 'lenguaje',
    level: 'advanced',
    descriptionES: 'Dart es el lenguaje optimizado para Flutter, permitiendo desarrollo multiplataforma eficiente. Utilizamos sus características modernas como null safety, async/await, y programación reactiva para aplicaciones móviles y web.',
    descriptionEN: 'Dart is the optimized language for Flutter, enabling efficient cross-platform development. We use its modern features like null safety, async/await, and reactive programming for mobile and web applications.',
    experience: '3+ años'
  },

  // FRAMEWORKS Y LIBRERÍAS
  { 
    name: 'Next.js', 
    logo: '/image/logos/lf_next.png', 
    color: '#000000',
    category: 'framework',
    level: 'expert',
    descriptionES: 'Next.js es nuestro framework preferido para aplicaciones React de producción. Implementamos SSR, SSG, ISR, API routes, optimización automática y deployment optimizado para máximo rendimiento.',
    descriptionEN: 'Next.js is our preferred framework for production React applications. We implement SSR, SSG, ISR, API routes, automatic optimization, and optimized deployment for maximum performance.',
    experience: '4+ años'
  },
  { 
    name: 'Flutter', 
    logo: '/image/logos/lf_flutter.png', 
    color: '#02569B',
    category: 'framework',
    level: 'expert',
    descriptionES: 'Flutter permite crear aplicaciones nativas multiplataforma con una sola base de código. Desarrollamos apps iOS/Android con UI personalizada, animaciones complejas y rendimiento nativo.',
    descriptionEN: 'Flutter enables creating cross-platform native applications with a single codebase. We develop iOS/Android apps with custom UI, complex animations, and native performance.',
    experience: '3+ años'
  },
  { 
    name: 'Astro', 
    logo: '/image/logos/lf_astro.png', 
    color: '#FF5D01',
    category: 'framework',
    level: 'advanced',
    descriptionES: 'Astro revoluciona el desarrollo web con su arquitectura de islas y hidratación parcial. Creamos sitios ultra-rápidos combinando componentes de múltiples frameworks con carga mínima de JavaScript.',
    descriptionEN: 'Astro revolutionizes web development with its islands architecture and partial hydration. We create ultra-fast sites combining components from multiple frameworks with minimal JavaScript loading.',
    experience: '2+ años'
  },
  { 
    name: 'Docker', 
    logo: '/image/logos/docker.png', 
    color: '#2496ED',
    category: 'framework',
    level: 'expert',
    descriptionES: 'Docker es fundamental en nuestra estrategia DevOps. Creamos contenedores optimizados, orquestación con Kubernetes, CI/CD pipelines automatizados y arquitecturas de microservicios escalables.',
    descriptionEN: 'Docker is fundamental to our DevOps strategy. We create optimized containers, Kubernetes orchestration, automated CI/CD pipelines, and scalable microservices architectures.',
    experience: '5+ años'
  },
  { 
    name: 'Qwik', 
    logo: '/image/logos/lf_qwik.png', 
    color: '#AC7EF4',
    category: 'framework',
    level: 'intermediate',
    descriptionES: 'Qwik redefine la velocidad web con resumabilidad instantánea y zero hydration. Implementamos aplicaciones que cargan instantáneamente sin importar el tamaño, revolucionando la experiencia del usuario.',
    descriptionEN: 'Qwik redefines web speed with instant resumability and zero hydration. We implement applications that load instantly regardless of size, revolutionizing user experience.',
    experience: '1+ año'
  },
  { 
    name: 'Airflow', 
    logo: '/image/logos/airflow.png', 
    color: '#017CEE',
    category: 'framework',
    level: 'advanced',
    descriptionES: 'Apache Airflow orquesta flujos de trabajo complejos de datos. Automatizamos pipelines ETL, procesamiento de big data, y tareas programadas con monitoreo avanzado y manejo de dependencias.',
    descriptionEN: 'Apache Airflow orchestrates complex data workflows. We automate ETL pipelines, big data processing, and scheduled tasks with advanced monitoring and dependency management.',
    experience: '3+ años'
  },
  { 
    name: 'Spark', 
    logo: '/image/logos/spark.png', 
    color: '#E25A1C',
    category: 'framework',
    level: 'advanced',
    descriptionES: 'Apache Spark procesa grandes volúmenes de datos con velocidad y eficiencia. Implementamos análisis distribuido, machine learning a escala, y procesamiento tanto en tiempo real como por lotes.',
    descriptionEN: 'Apache Spark processes large data volumes with speed and efficiency. We implement distributed analytics, machine learning at scale, and both real-time and batch processing.',
    experience: '4+ años'
  },
  { 
    name: 'Strapi', 
    logo: '/image/logos/strapi.png', 
    color: '#2E7EEA',
    category: 'framework',
    level: 'advanced',
    descriptionES: 'Strapi es nuestro CMS Headless para gestión de contenido flexible. Creamos APIs robustas, sistemas de gestión personalizados, y backends escalables para aplicaciones web y móviles.',
    descriptionEN: 'Strapi is our Headless CMS for flexible content management. We create robust APIs, custom management systems, and scalable backends for web and mobile applications.',
    experience: '2+ años'
  },

  // BASES DE DATOS
  { 
    name: 'PostgreSQL', 
    logo: '/image/logos/postgresql.png', 
    color: '#336791',
    category: 'base de datos',
    level: 'expert',
    descriptionES: 'PostgreSQL es nuestra base de datos relacional preferida. Implementamos queries optimizados, índices avanzados, funciones almacenadas, triggers, y características NoSQL para máximo rendimiento y flexibilidad.',
    descriptionEN: 'PostgreSQL is our preferred relational database. We implement optimized queries, advanced indexes, stored functions, triggers, and NoSQL features for maximum performance and flexibility.',
    experience: '6+ años'
  },
  { 
    name: 'MySQL', 
    logo: '/image/logos/mysql.png', 
    color: '#4479A1',
    category: 'base de datos',
    level: 'advanced',
    descriptionES: 'MySQL potencia aplicaciones web de alto tráfico. Optimizamos consultas complejas, configuramos replicación maestro-esclavo, particionado de tablas y clustering para máximo rendimiento.',
    descriptionEN: 'MySQL powers high-traffic web applications. We optimize complex queries, configure master-slave replication, table partitioning, and clustering for maximum performance.',
    experience: '7+ años'
  },
  { 
    name: 'Oracle', 
    logo: '/image/logos/oracle.png', 
    color: '#F80000',
    category: 'base de datos',
    level: 'advanced',
    descriptionES: 'Oracle maneja sistemas empresariales críticos con robustez y escalabilidad. Implementamos procedimientos almacenados complejos, particionado avanzado, y optimización de rendimiento para grandes volúmenes.',
    descriptionEN: 'Oracle handles critical enterprise systems with robustness and scalability. We implement complex stored procedures, advanced partitioning, and performance optimization for large volumes.',
    experience: '5+ años'
  },
  { 
    name: 'SQLite', 
    logo: '/image/logos/sqlite.png', 
    color: '#003B57',
    category: 'base de datos',
    level: 'advanced',
    descriptionES: 'SQLite ofrece una base de datos embebida ligera y eficaz. Ideal para aplicaciones móviles, prototipado rápido, y sistemas que requieren almacenamiento local sin configuración compleja.',
    descriptionEN: 'SQLite provides a lightweight and efficient embedded database. Ideal for mobile applications, rapid prototyping, and systems requiring local storage without complex configuration.',
    experience: '4+ años'
  },
  { 
    name: 'IBM DB2', 
    logo: '/image/logos/ibmDB2.png', 
    color: '#1F70C1',
    category: 'base de datos',
    level: 'intermediate',
    descriptionES: 'IBM DB2 proporciona gestión empresarial avanzada de datos. Implementamos soluciones robustas para mainframes y sistemas distribuidos con herramientas de análisis y gestión empresarial.',
    descriptionEN: 'IBM DB2 provides advanced enterprise data management. We implement robust solutions for mainframes and distributed systems with enterprise analytics and management tools.',
    experience: '3+ años'
  },
  { 
    name: 'iSeries', 
    logo: '/image/logos/iseries.png', 
    color: '#FF6B35',
    category: 'base de datos',
    level: 'intermediate',
    descriptionES: 'IBM iSeries (AS/400) es una plataforma robusta para sistemas empresariales. Desarrollamos aplicaciones críticas con alta disponibilidad, seguridad avanzada, y integración con sistemas legacy.',
    descriptionEN: 'IBM iSeries (AS/400) is a robust platform for enterprise systems. We develop critical applications with high availability, advanced security, and legacy system integration.',
    experience: '4+ años'
  },
  { 
    name: 'Supabase', 
    logo: '/image/logos/supabase.png', 
    color: '#3ECF8E',
    category: 'base de datos',
    level: 'advanced',
    descriptionES: 'Supabase combina PostgreSQL con funcionalidades modernas como autenticación, real-time subscriptions, storage de archivos y edge functions. Desarrollo rápido sin sacrificar potencia empresarial.',
    descriptionEN: 'Supabase combines PostgreSQL with modern features like authentication, real-time subscriptions, file storage, and edge functions. Rapid development without sacrificing enterprise power.',
    experience: '2+ años'
  },

  // SERVICIOS EN LA NUBE
  { 
    name: 'AWS', 
    logo: '/image/logos/aws-logo.png', 
    color: '#FF9900',
    category: 'servicio',
    level: 'expert',
    descriptionES: 'AWS es nuestra plataforma cloud principal. Implementamos arquitecturas serverless, microservicios, auto-scaling, CI/CD, y soluciones de big data usando servicios como Lambda, ECS, RDS, y S3.',
    descriptionEN: 'AWS is our main cloud platform. We implement serverless architectures, microservices, auto-scaling, CI/CD, and big data solutions using services like Lambda, ECS, RDS, and S3.',
    experience: '6+ años'
  },
  { 
    name: 'Google Cloud', 
    logo: '/image/logos/google-cloud.png', 
    color: '#4285F4',
    category: 'servicio',
    level: 'advanced',
    descriptionES: 'Google Cloud Platform potencia nuestras soluciones de IA y machine learning. Utilizamos BigQuery para análisis, Cloud Functions para serverless, y AI Platform para modelos de ML avanzados.',
    descriptionEN: 'Google Cloud Platform powers our AI and machine learning solutions. We use BigQuery for analytics, Cloud Functions for serverless, and AI Platform for advanced ML models.',
    experience: '4+ años'
  },
  { 
    name: 'Azure', 
    logo: '/image/logos/azure.png', 
    color: '#0078D4',
    category: 'servicio',
    level: 'advanced',
    descriptionES: 'Microsoft Azure integra perfectamente con ecosistemas empresariales. Implementamos soluciones híbridas, Active Directory, DevOps pipelines, y aplicaciones que requieren integración con Office 365.',
    descriptionEN: 'Microsoft Azure integrates seamlessly with enterprise ecosystems. We implement hybrid solutions, Active Directory, DevOps pipelines, and applications requiring Office 365 integration.',
    experience: '3+ años'
  },
  { 
    name: 'Vercel', 
    logo: '/image/logos/vercel-logo.png', 
    color: '#000000',
    category: 'servicio',
    level: 'expert',
    descriptionES: 'Vercel optimiza el deployment de aplicaciones modernas. Implementamos edge computing, preview deployments automáticos, optimización de performance, y experiencias de developer ultra-rápidas.',
    descriptionEN: 'Vercel optimizes modern application deployment. We implement edge computing, automatic preview deployments, performance optimization, and ultra-fast developer experiences.',
    experience: '3+ años'
  },
  { 
    name: 'Cloudflare', 
    logo: '/image/logos/cloudflare.png', 
    color: '#F38020',
    category: 'servicio',
    level: 'advanced',
    descriptionES: 'Cloudflare protege y acelera nuestras aplicaciones web. Configuramos CDN global, protección DDoS, optimización automática, Workers para edge computing, y analytics avanzados.',
    descriptionEN: 'Cloudflare protects and accelerates our web applications. We configure global CDN, DDoS protection, automatic optimization, Workers for edge computing, and advanced analytics.',
    experience: '4+ años'
  },
  { 
    name: 'IBM Cloud', 
    logo: '/image/logos/IBM-cloud.png', 
    color: '#1261FE',
    category: 'servicio',
    level: 'intermediate',
    descriptionES: 'IBM Cloud proporciona soluciones empresariales robustas. Implementamos Watson AI, blockchain, análisis avanzados, y soluciones híbridas para transformación digital empresarial.',
    descriptionEN: 'IBM Cloud provides robust enterprise solutions. We implement Watson AI, blockchain, advanced analytics, and hybrid solutions for enterprise digital transformation.',
    experience: '2+ años'
  },
  { 
    name: 'Salesforce', 
    logo: '/image/logos/salesforce.png', 
    color: '#00A1E0',
    category: 'servicio',
    level: 'advanced',
    descriptionES: 'Salesforce lidera nuestras soluciones CRM. Desarrollamos aplicaciones personalizadas, automatizaciones complejas, integraciones con sistemas externos, y experiencias de cliente excepcionales.',
    descriptionEN: 'Salesforce leads our CRM solutions. We develop custom applications, complex automations, external system integrations, and exceptional customer experiences.',
    experience: '4+ años'
  },

  // SOFTWARE Y HERRAMIENTAS
  { 
    name: 'BonitaSoft', 
    logo: '/image/logos/bonitaSoft.png', 
    color: '#FF6B35',
    category: 'software',
    level: 'advanced',
    descriptionES: 'BonitaSoft automatiza procesos de negocio complejos. Diseñamos workflows empresariales, automatizaciones inteligentes, y sistemas de gestión que optimizan operaciones y reducen tiempos de proceso.',
    descriptionEN: 'BonitaSoft automates complex business processes. We design enterprise workflows, intelligent automations, and management systems that optimize operations and reduce process times.',
    experience: '3+ años'
  },
  { 
    name: 'Camunda', 
    logo: '/image/logos/camunda.png', 
    color: '#FC5D0D',
    category: 'software',
    level: 'advanced',
    descriptionES: 'Camunda potencia la automatización de procesos con BPMN. Implementamos motores de workflow robustos, monitoreo en tiempo real, y orquestación de microservicios para procesos empresariales críticos.',
    descriptionEN: 'Camunda powers process automation with BPMN. We implement robust workflow engines, real-time monitoring, and microservices orchestration for critical business processes.',
    experience: '2+ años'
  },

  // SERVIDORES Y INFRAESTRUCTURA
  { 
    name: 'Nginx', 
    logo: '/image/logos/nginx.png', 
    color: '#009639',
    category: 'servidor',
    level: 'expert',
    descriptionES: 'Nginx es nuestro servidor web de alto rendimiento. Configuramos load balancing, proxy inverso, SSL/TLS, compresión, caching, y optimizaciones para manejar miles de conexiones concurrentes.',
    descriptionEN: 'Nginx is our high-performance web server. We configure load balancing, reverse proxy, SSL/TLS, compression, caching, and optimizations to handle thousands of concurrent connections.',
    experience: '5+ años'
  }
];

// Agrupación de tecnologías por categoría
const groupedTechnologies = {
  'lenguaje': {
    titleES: 'Lenguajes de Programación',
    titleEN: 'Programming Languages',
    icon: '💻',
    color: '#4F46E5',
    technologies: technologies.filter(tech => tech.category === 'lenguaje')
  },
  'framework': {
    titleES: 'Frameworks y Librerías',
    titleEN: 'Frameworks & Libraries',
    icon: '🔧',
    color: '#059669',
    technologies: technologies.filter(tech => tech.category === 'framework')
  },
  'base de datos': {
    titleES: 'Bases de Datos',
    titleEN: 'Databases',
    icon: '🗄️',
    color: '#DC2626',
    technologies: technologies.filter(tech => tech.category === 'base de datos')
  },
  'servicio': {
    titleES: 'Servicios en la Nube',
    titleEN: 'Cloud Services',
    icon: '☁️',
    color: '#7C3AED',
    technologies: technologies.filter(tech => tech.category === 'servicio')
  },
  'software': {
    titleES: 'Software Empresarial',
    titleEN: 'Enterprise Software',
    icon: '⚙️',
    color: '#EA580C',
    technologies: technologies.filter(tech => tech.category === 'software')
  },
  'servidor': {
    titleES: 'Servidores e Infraestructura',
    titleEN: 'Servers & Infrastructure',
    icon: '🖥️',
    color: '#0891B2',
    technologies: technologies.filter(tech => tech.category === 'servidor')
  }
};

const TechStackGrouped = ({ useTooltip = true }) => {
  const ingles = useStore(isEnglish);
  const containerRef = useRef(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [visibleGroups, setVisibleGroups] = useState(new Set());

  console.log('TechStackGrouped rendered, useTooltip:', useTooltip);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const groupId = entry.target.dataset.groupId;
            if (groupId) {
              setVisibleGroups(prev => new Set([...prev, groupId]));
            }
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    const groupElements = container.querySelectorAll('[data-group-id]');
    groupElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleTechClick = (tech, event) => {
    console.log('Tech clicked:', tech.name, 'useTooltip:', useTooltip);
    
    if (useTooltip) {
      const rect = event.currentTarget.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      const newPosition = {
        x: rect.left + rect.width / 2,
        y: rect.top + scrollTop + rect.height + 10
      };
      
      console.log('Tooltip position:', newPosition);
      setTooltipPosition(newPosition);
    } else {
      setClickPosition({
        clientX: event.clientX,
        clientY: event.clientY
      });
    }
    
    setSelectedTech(tech);
  };

  const handleCloseModal = () => {
    setSelectedTech(null);
    setClickPosition(null);
    setTooltipPosition({ x: 0, y: 0 });
  };

  // Cerrar tooltip al hacer click fuera (solo para tooltip)
  useEffect(() => {
    if (!useTooltip) return;
    
    const handleClickOutside = (event) => {
      if (selectedTech && !event.target.closest('[data-tooltip]')) {
        handleCloseModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [selectedTech, useTooltip]);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.neuralNetwork} />
        <div className={styles.dataFlow} />
        <div className={styles.quantumField} />
      </div>

      {/* Tech Groups */}
      <div className={styles.techGroups}>
        {Object.entries(groupedTechnologies).map(([categoryKey, group], groupIndex) => (
          <div
            key={categoryKey}
            className={`${styles.techGroup} ${visibleGroups.has(categoryKey) ? styles.visible : ''}`}
            data-group-id={categoryKey}
            style={{ '--delay': `${groupIndex * 0.2}s`, '--group-color': group.color }}
          >
            {/* Group Header */}
            <div className={styles.groupHeader}>
              <div className={styles.groupIcon}>{group.icon}</div>
              <h3 className={styles.groupTitle}>
                {ingles ? group.titleEN : group.titleES}
              </h3>
              <div className={styles.groupLine} />
              <span className={styles.techCount}>
                {group.technologies.length}
              </span>
            </div>

            {/* Technologies Grid */}
            <div className={styles.technologiesGrid}>
              {group.technologies.map((tech, techIndex) => (
                <div
                  key={tech.name}
                  className={styles.techCard}
                  onClick={(e) => handleTechClick(tech, e)}
                  style={{ 
                    '--tech-delay': `${techIndex * 0.1}s`,
                    '--tech-color': tech.color
                  }}
                  data-tooltip={useTooltip ? 'true' : undefined}
                >
                  <div className={styles.cardBackground} />
                  <div className={styles.cardContent}>
                    <div className={styles.logoContainer}>
                      <img 
                        src={tech.logo} 
                        alt={tech.name}
                        className={styles.techLogo}
                      />
                      <div className={styles.logoGlow} />
                    </div>
                    
                    <div className={styles.techInfo}>
                      <h4 className={styles.techName}>{tech.name}</h4>
                      <div className={styles.techMeta}>
                        <span className={styles.techLevel} data-level={tech.level}>
                          {tech.level === 'expert' ? (ingles ? 'Expert' : 'Experto') :
                           tech.level === 'advanced' ? (ingles ? 'Advanced' : 'Avanzado') :
                           (ingles ? 'Intermediate' : 'Intermedio')}
                        </span>
                        <span className={styles.techExperience}>
                          {tech.experience}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Effects */}
                  <div className={styles.hoverEffect} />
                  <div className={styles.sparkles}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className={styles.sparkle} style={{ '--i': i }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Elements */}
      <div className={styles.floatingElements}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            className={styles.floatingElement}
            style={{ 
              '--delay': `${i * 0.8}s`,
              '--x': `${20 + (i * 60) % 80}%`,
              '--y': `${10 + (i * 40) % 80}%`
            }}
          />
        ))}
      </div>

      {/* Tech Modal or Tooltip */}
      {selectedTech && (
        useTooltip ? (
          <TechTooltip 
            tech={selectedTech}
            position={tooltipPosition}
            onClose={handleCloseModal}
            isEnglish={ingles}
          />
        ) : (
          <TechModal 
            tech={selectedTech}
            onClose={handleCloseModal}
            isEnglish={ingles}
            clickPosition={clickPosition}
          />
        )
      )}
    </div>
  );
};

export default TechStackGrouped;
