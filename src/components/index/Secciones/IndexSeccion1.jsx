import React, { useEffect, useState } from "react";
import { isEnglish } from '../../../data/variables';
import { translations } from '../../../data/translations';
import { useStore } from '@nanostores/react';
import styles from "../css/indexSeccion1.module.css";
import ParticleBackground from '../components/ParticleBackground.jsx';
import HexagonalGrid from '../components/HexagonalGrid.jsx';
import FloatingElements from '../components/FloatingElements.jsx';
import TypingEffect from '../components/TypingEffect.jsx';
import MatrixRain from '../components/MatrixRain.jsx';
import TechScanlines from '../components/TechScanlines.jsx';
import HolographicInterface from '../components/HolographicInterface.jsx';

const NosotrosSeccion1 = () => {
  const ingles = useStore(isEnglish);
  const textos = ingles ? translations.en.nosotrosCarrusel : translations.es.nosotrosCarrusel;
  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState("fadeInUp");
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    setAnim("fadeInUp");
    setShowTyping(false);
    
    const showTimer = setTimeout(() => {
      setShowTyping(true);
    }, 500);

    const timer = setTimeout(() => {
      setAnim("fadeOutUp");
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % textos.length);
        setAnim("fadeInUp");
      }, 1000);
    }, 6000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(showTimer);
    };
  }, [index, textos]);

  return (
    <section className={styles.sections}>
      {/* Video de fondo con overlay tecnológico */}
      <video id="background-video" loop autoPlay muted playsInline className={styles.videox}>
        <source src="/videos/cblunaintro.mp4" type="video/mp4" />
      </video>
      
      {/* Efecto Matrix de fondo */}
      <MatrixRain />
      
      {/* Overlay tecnológico */}
      <div className={styles.techOverlay}></div>
      
      {/* Grid hexagonal de fondo */}
      <HexagonalGrid />
      
      {/* Efectos de partículas */}
      <ParticleBackground />
      
      {/* Elementos flotantes de código */}
      <FloatingElements />
      
      {/* Líneas de escaneo tecnológicas */}
   {/*    <TechScanlines /> */}
      
      {/* Interfaz holográfica */}
      <HolographicInterface />
      
      {/* Contenido principal */}
      <div className={styles.contentContainer}>
        <div className={`${styles.textosAnimados} ${styles[anim]}`}> 
          <div className={styles.titleContainer}>
            <span className={styles.titulo}>
              {showTyping ? (
                <TypingEffect 
                  text={textos[index].title} 
                  speed={80} 
                  delay={0}
                />
              ) : textos[index].title}
            </span>
          </div>
          <div className={styles.subtitleContainer}>
            <span className={styles.subtitulo}>
              {showTyping ? (
                <TypingEffect 
                  text={textos[index].subtitle} 
                  speed={60} 
                  delay={1500}
                />
              ) : textos[index].subtitle}
            </span>
          </div>
        </div>
        
        {/* Líneas de código decorativas */}
        <div className={styles.codeLines}>
          <div className={styles.codeLine}>{'<innovation>'}</div>
          <div className={styles.codeLine}>{'  const future = await cbluna.develop();'}</div>
          <div className={styles.codeLine}>{'</innovation>'}</div>
        </div>
      </div>
      
      {/* Gradiente inferior */}
      <div className={styles.bottomFade}></div>
      
      {/* Indicadores de carrusel */}
      <div className={styles.carouselIndicators}>
        {textos.map((_, i) => (
          <div 
            key={i} 
            className={`${styles.indicator} ${i === index ? styles.active : ''}`}
          />
        ))}
      </div>
    </section>
  );
};

export default NosotrosSeccion1;
