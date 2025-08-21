import { translations } from '../../../data/translations';
import { isEnglish } from '../../../data/variables';
import { useStore } from '@nanostores/react';
import { useRef, useEffect } from 'react';
import styles from "../css/indexSeccion2.module.css"; 
import TechSolutions from "../components/TechSolutions";

const IndexSeccion2 = () => {
    const ingles = useStore(isEnglish);
    const t = ingles ? translations.en : translations.es;
 
    const solutionsTitle = t.solutionsTitle || "Explora nuestras soluciones";
    const solutionsSubtitle = t.solutionsSubtitle || "innovadoras y personalizadas";
    const sectionRef = useRef(null);
    
    useEffect(() => {
      const section = sectionRef.current;
      let hasAnimated = false;
      if (!section) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            section.classList.add(styles.fadeInUp);
            hasAnimated = true;
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(section);
      return () => observer.disconnect();
    }, []);

    return (
      <>
        <div className={styles.centeredText}>
          <h1 className={`${styles.largeText} ${styles.whiteText}`}>
            {solutionsTitle}
          </h1>
          <h2 className={`${styles.largeText} ${styles.boldText} ${styles.gradientText}`}>
            {solutionsSubtitle}
          </h2>
        </div>
  
        <section id="soluciones" className={styles.sections} ref={sectionRef}>
          <div className={styles.gradientBackgroundTop}></div>
          <div className={styles.gradientBackgroundBottom}></div>
          
          {/* New Tech Solutions Component */}
          <div className={styles.techSolutionsContainer}>
            <TechSolutions />
          </div>
        </section>
      </>
    );
  };
  
  
  export default IndexSeccion2;