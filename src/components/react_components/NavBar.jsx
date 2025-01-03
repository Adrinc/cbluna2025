import React, { useState } from "react";
import styles from "./navbar.module.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el menú en móviles
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo con gradiente */}
      <div className={styles.logopic}>
        <img src="/favicon.png" alt="Logo" />
      </div>

      {/* Ícono de menú hamburguesa para móviles */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>

      {/* Menú de navegación */}
      <ul className={`${styles.navMenu} ${isOpen ? styles.active : ""}`}>
        <li className={styles.navItem}>
          <a href="/" className={styles.navLink}>Inicio</a>
        </li>
        <li className={styles.navItem}>
          <a href="/nosotros" className={styles.navLink}>Nosotros</a>
        </li>
        <li className={styles.navItem}>
          <a href="/proyectos" className={styles.navLink}>Proyectos</a>
        </li>
        <li className={styles.navItem}>
          <a href="/servicios" className={styles.navLink}>Servicios</a>
        </li>
      </ul>

      {/* Iconos de redes sociales */}
      <div
  className={styles.socialIconsGroup}
  onClick={() => (window.location.href = '/redesSociales')}
>
    <img src="/icons/facebook.svg" alt="Facebook" className={styles.icon} />
    <img src="/icons/twitter.svg" alt="Twitter" className={styles.icon} />
    <img src="/icons/linkedin.svg" alt="LinkedIn" className={styles.icon} />

</div>

      <div className="hidden md:block ">
                    <div className="flex items-center justify-end"><a className={styles.buyButton} href="/contacto">Contacto</a></div>
                </div>
    </nav>
  );
};

export default NavBar;
