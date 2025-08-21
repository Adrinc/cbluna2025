import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../data/variables';
import TechModal from './TechModal.jsx';
import styles from '../css/techMatrixDesktop.module.css';

// Datos completos de tecnologías organizados
const technologiesMatrix = [
  // Fila 1 - Lenguajes Core
  { 
    name: 'JavaScript', 
    logo: '/image/logos/lf_javascript.png', 
    color: '#F7DF1E',
    category: 'language',
    level: 'expert',
    descriptionES: 'JavaScript es el lenguaje de programación más versátil del desarrollo web moderno. Desde interfaces interactivas hasta aplicaciones del lado del servidor con Node.js, dominamos todas sus capacidades avanzadas incluyendo ES6+, async/await, y arquitecturas modernas.',
    descriptionEN: 'JavaScript is the most versatile programming language in modern web development. From interactive interfaces to server-side applications with Node.js, we master all its advanced capabilities including ES6+, async/await, and modern architectures.',
    position: { row: 0, col: 0 },
    experience: '8+ años'
  },
  { 
    name: 'TypeScript', 
    logo: '/image/logos/lf_typescript.png', 
    color: '#3178C6',
    category: 'language',
    level: 'expert',
    descriptionES: 'TypeScript eleva JavaScript con tipado estático, proporcionando desarrollo más seguro y mantenible. Utilizamos tipos avanzados, generics, decoradores y patrones de diseño para crear arquitecturas robustas y escalables.',
    descriptionEN: 'TypeScript elevates JavaScript with static typing, providing safer and more maintainable development. We use advanced types, generics, decorators, and design patterns to create robust and scalable architectures.',
    position: { row: 0, col: 1 },
    experience: '6+ años'
  },
  { 
    name: 'Python', 
    logo: '/image/logos/lf_python.png', 
    color: '#3776AB',
    category: 'language',
    level: 'expert',
    descriptionES: 'Python es nuestra herramienta principal para IA, machine learning, análisis de datos y automatización. Dominamos frameworks como TensorFlow, PyTorch, FastAPI, Django y bibliotecas especializadas para ciencia de datos.',
    descriptionEN: 'Python is our main tool for AI, machine learning, data analysis, and automation. We master frameworks like TensorFlow, PyTorch, FastAPI, Django, and specialized libraries for data science.',
    position: { row: 0, col: 2 },
    experience: '7+ años'
  },
  { 
    name: 'Java', 
    logo: '/image/logos/lf_java.png', 
    color: '#ED8B00',
    category: 'language',
    level: 'advanced',
    descriptionES: 'Java potencia aplicaciones empresariales críticas con su robustez y escalabilidad. Implementamos arquitecturas microservicios, sistemas distribuidos y aplicaciones de alto rendimiento usando Spring Boot, JPA y tecnologías cloud-native.',
    descriptionEN: 'Java powers critical enterprise applications with its robustness and scalability. We implement microservices architectures, distributed systems, and high-performance applications using Spring Boot, JPA, and cloud-native technologies.',
    position: { row: 0, col: 3 },
    experience: '5+ años'
  },

  // Fila 2 - Frameworks Modernos
  { 
    name: 'Next.js', 
    logo: '/image/logos/lf_next.png', 
    color: '#000000',
    category: 'framework',
    level: 'expert',
    descriptionES: 'Next.js es nuestro framework preferido para aplicaciones React de producción. Implementamos SSR, SSG, ISR, API routes, optimización automática de imágenes y deployment en edge computing para máximo rendimiento.',
    descriptionEN: 'Next.js is our preferred framework for production React applications. We implement SSR, SSG, ISR, API routes, automatic image optimization, and edge computing deployment for maximum performance.',
    position: { row: 1, col: 0 },
    experience: '4+ años'
  },
  { 
    name: 'Flutter', 
    logo: '/image/logos/lf_flutter.png', 
    color: '#02569B',
    category: 'framework',
    level: 'expert',
    descriptionES: 'Flutter nos permite crear aplicaciones nativas multiplataforma con una sola base de código. Desarrollamos apps iOS/Android con UI personalizada, animaciones complejas, integración con APIs nativas y rendimiento comparable a apps nativas.',
    descriptionEN: 'Flutter allows us to create cross-platform native applications with a single codebase. We develop iOS/Android apps with custom UI, complex animations, native API integration, and performance comparable to native apps.',
    position: { row: 1, col: 1 },
    experience: '3+ años'
  },
  { 
    name: 'Astro', 
    logo: '/image/logos/lf_astro.png', 
    color: '#FF5D01',
    category: 'framework',
    level: 'advanced',
    descriptionES: 'Astro revoluciona el desarrollo web con su arquitectura de islas y hidratación parcial. Creamos sitios ultra-rápidos que combinan componentes de múltiples frameworks, optimización automática y carga mínima de JavaScript.',
    descriptionEN: 'Astro revolutionizes web development with its islands architecture and partial hydration. We create ultra-fast sites that combine components from multiple frameworks, automatic optimization, and minimal JavaScript loading.',
    position: { row: 1, col: 2 },
    experience: '2+ años'
  },
  { 
    name: 'Docker', 
    logo: '/image/logos/docker.png', 
    color: '#2496ED',
    category: 'framework',
    level: 'expert',
    descriptionES: 'Docker es fundamental en nuestra estrategia DevOps. Creamos contenedores optimizados, orquestación con Kubernetes, CI/CD pipelines automatizados y arquitecturas de microservicios que escalan automáticamente.',
    descriptionEN: 'Docker is fundamental to our DevOps strategy. We create optimized containers, Kubernetes orchestration, automated CI/CD pipelines, and microservices architectures that scale automatically.',
    position: { row: 1, col: 3 },
    experience: '5+ años'
  },

  // Fila 3 - Bases de Datos
  { 
    name: 'PostgreSQL', 
    logo: '/image/logos/postgresql.png', 
    color: '#336791',
    category: 'database',
    level: 'expert',
    descriptionES: 'PostgreSQL es nuestra base de datos relacional preferida para aplicaciones complejas. Implementamos queries optimizados, índices avanzados, funciones almacenadas, triggers, y características NoSQL para máximo rendimiento y flexibilidad.',
    descriptionEN: 'PostgreSQL is our preferred relational database for complex applications. We implement optimized queries, advanced indexes, stored functions, triggers, and NoSQL features for maximum performance and flexibility.',
    position: { row: 2, col: 0 },
    experience: '6+ años'
  },
  { 
    name: 'MySQL', 
    logo: '/image/logos/mysql.png', 
    color: '#4479A1',
    category: 'database',
    level: 'advanced',
    descriptionES: 'MySQL potencia aplicaciones web de alto tráfico con su velocidad y confiabilidad. Optimizamos consultas complejas, configuramos replicación maestro-esclavo, particionado de tablas y clustering para máximo rendimiento.',
    descriptionEN: 'MySQL powers high-traffic web applications with its speed and reliability. We optimize complex queries, configure master-slave replication, table partitioning, and clustering for maximum performance.',
    position: { row: 2, col: 1 },
    experience: '7+ años'
  },
  { 
    name: 'Oracle', 
    logo: '/image/logos/oracle.png', 
    color: '#F80000',
    category: 'database',
    level: 'advanced',
    descriptionES: 'Oracle maneja sistemas empresariales críticos con su robustez y escalabilidad. Implementamos procedimientos almacenados complejos, particionado avanzado, RAC clustering y optimización de rendimiento para grandes volúmenes.',
    descriptionEN: 'Oracle handles critical enterprise systems with its robustness and scalability. We implement complex stored procedures, advanced partitioning, RAC clustering, and performance optimization for large volumes.',
    position: { row: 2, col: 2 },
    experience: '5+ años'
  },
  { 
    name: 'Supabase', 
    logo: '/image/logos/supabase.png', 
    color: '#3ECF8E',
    category: 'database',
    level: 'advanced',
    descriptionES: 'Supabase combina PostgreSQL con funcionalidades modernas como autenticación, real-time subscriptions, storage de archivos y edge functions. Ideal para desarrollo rápido sin sacrificar potencia empresarial.',
    descriptionEN: 'Supabase combines PostgreSQL with modern features like authentication, real-time subscriptions, file storage, and edge functions. Ideal for rapid development without sacrificing enterprise power.',
    position: { row: 2, col: 3 },
    experience: '2+ años'
  },

  // Fila 4 - Cloud & Servicios
  { 
    name: 'AWS', 
    logo: '/image/logos/aws-logo.png', 
    color: '#FF9900',
    category: 'cloud',
    level: 'expert',
    descriptionES: 'AWS es nuestra plataforma cloud principal para soluciones empresariales. Implementamos arquitecturas serverless con Lambda, containerización con ECS/EKS, ML con SageMaker, y infraestructura como código con CloudFormation.',
    descriptionEN: 'AWS is our main cloud platform for enterprise solutions. We implement serverless architectures with Lambda, containerization with ECS/EKS, ML with SageMaker, and infrastructure as code with CloudFormation.',
    position: { row: 3, col: 0 },
    experience: '6+ años'
  },
  { 
    name: 'Azure', 
    logo: '/image/logos/azure.png', 
    color: '#0078D4',
    category: 'cloud',
    level: 'advanced',
    descriptionES: 'Azure potencia aplicaciones empresariales con servicios integrados de Microsoft. Implementamos aplicaciones .NET, bases de datos SQL, Active Directory, Cognitive Services y deployment automatizado con DevOps.',
    descriptionEN: 'Azure powers enterprise applications with Microsoft integrated services. We implement .NET applications, SQL databases, Active Directory, Cognitive Services, and automated deployment with DevOps.',
    position: { row: 3, col: 1 },
    experience: '4+ años'
  },
  { 
    name: 'Google Cloud', 
    logo: '/image/logos/google-cloud.png', 
    color: '#4285F4',
    category: 'cloud',
    level: 'advanced',
    descriptionES: 'Google Cloud acelera desarrollo con IA/ML integrada. Utilizamos BigQuery para análisis masivos, Kubernetes Engine para orquestación, Cloud Functions para serverless y Vertex AI para machine learning avanzado.',
    descriptionEN: 'Google Cloud accelerates development with integrated AI/ML. We use BigQuery for massive analytics, Kubernetes Engine for orchestration, Cloud Functions for serverless, and Vertex AI for advanced machine learning.',
    position: { row: 3, col: 2 },
    experience: '3+ años'
  },
  { 
    name: 'Cloudflare', 
    logo: '/image/logos/cloudflare.png', 
    color: '#F38020',
    category: 'cloud',
    level: 'advanced',
    descriptionES: 'Cloudflare optimiza rendimiento y seguridad globalmente. Implementamos edge computing, Workers para lógica distribuida, WAF avanzado, DDoS protection y CDN inteligente que mejora velocidad hasta 300%.',
    descriptionEN: 'Cloudflare optimizes performance and security globally. We implement edge computing, Workers for distributed logic, advanced WAF, DDoS protection, and intelligent CDN that improves speed up to 300%.',
    position: { row: 3, col: 3 },
    experience: '3+ años'
  }
];

const TechMatrixDesktop = () => {
  const ingles = useStore(isEnglish);
  const [selectedTech, setSelectedTech] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTechClick = (tech) => {
    setSelectedTech(tech);
  };

  const handleCloseModal = () => {
    setSelectedTech(null);
  };

  return (
    <div ref={containerRef} className={`${styles.matrixContainer} ${isVisible ? styles.visible : ''}`}>
      {/* Background Matrix Effects */}
      <div className={styles.matrixBackground}>
        <div className={styles.gridLines}></div>
        <div className={styles.dataFlow}></div>
        <div className={styles.neuralPulse}></div>
      </div>

      {/* Floating Particles */}
      <div className={styles.particleSystem}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className={styles.particle} style={{ '--delay': `${i * 0.1}s` }} />
        ))}
      </div>

      {/* Tech Matrix Grid */}
      <div className={styles.techGrid}>
        {technologiesMatrix.map((tech, index) => (
          <div
            key={tech.name}
            className={`${styles.techHexagon} ${hoveredTech === tech.name ? styles.hovered : ''}`}
            style={{ 
              '--delay': `${index * 0.1}s`,
              '--tech-color': tech.color,
              '--row': tech.position.row,
              '--col': tech.position.col
            }}
            onMouseEnter={() => setHoveredTech(tech.name)}
            onMouseLeave={() => setHoveredTech(null)}
            onClick={() => handleTechClick(tech)}
          >
            {/* Hexagon Layers */}
            <div className={styles.hexagonOuter}>
              <div className={styles.hexagonInner}>
                <div className={styles.hexagonCore}>
                  {/* Tech Logo */}
                  <div className={styles.logoContainer}>
                    <img src={tech.logo} alt={tech.name} className={styles.techLogo} />
                  </div>
                  
                  {/* Tech Info */}
                  <div className={styles.techInfo}>
                    <h3 className={styles.techName}>{tech.name}</h3>
                    <span className={styles.techCategory}>
                      {tech.category === 'language' && '💻'}
                      {tech.category === 'framework' && '🔧'}
                      {tech.category === 'database' && '🗄️'}
                      {tech.category === 'cloud' && '☁️'}
                      {tech.category === 'ai' && '🤖'}
                      {tech.category.toUpperCase()}
                    </span>
                    <span className={styles.techLevel}>{tech.level}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Holographic Effects */}
            <div className={styles.holographicRings}>
              <div className={styles.ring1}></div>
              <div className={styles.ring2}></div>
              <div className={styles.ring3}></div>
            </div>

            {/* Energy Beam */}
            <div className={styles.energyBeam}></div>

            {/* Connection Lines */}
            {index < technologiesMatrix.length - 1 && (
              <div className={styles.connectionLine}></div>
            )}
          </div>
        ))}
      </div>

      {/* Quantum Field Effects */}
      <div className={styles.quantumField}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={styles.quantumOrb} style={{ '--index': i }} />
        ))}
      </div>

      {/* Enhanced Tech Modal */}
      {selectedTech && (
        <TechModal
          tech={selectedTech}
          onClose={handleCloseModal}
          isEnglish={ingles}
        />
      )}
    </div>
  );
};

export default TechMatrixDesktop;
