import { translations } from '../../../data/translations';
import { isEnglish } from '../../../data/variables';
import { useStore } from '@nanostores/react';
import ProyectosCarrusel from '../components/ProyectosCarrusel.jsx';

import styles from '../css/indexSeccion3.module.css';

const IndexSeccion3 = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? translations.en : translations.es;

  return (
    <section id="our_adventages" className={styles.section}>
      <div className={styles.esfera} />
      <div className={styles.gradientBackgroundTop}></div>
      <div className={styles.gradientBackgroundBottom}></div>

      <div className={styles.content}>
        <h1 className={styles.title}>{t.projectsTitle}</h1>
        <h2 className={styles.subtitle}>{t.projectsSubtitle}</h2>
      </div>

      <div className={styles.rivecomp}>
        <ProyectosCarrusel/>
      </div>
    </section>
  );
};

export default IndexSeccion3;
