import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";

import { useStore } from "@nanostores/react";
import { isEnglish, selectedCountry } from "../../data/variables"; 
import { useLang } from "../../data/signals"; // Importar el hook de idioma
import { translations } from "../../data/translations";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('/');
  const [scrolled, setScrolled] = useState(false);
  const country = useStore(selectedCountry); // Usar nanostore
  const { t, changeLang, lang } = useLang();
  const ingles = useStore(isEnglish);
  const textosNavbar = ingles ? translations.en.navbar : translations.es.navbar;

  // Detectar scroll para efectos
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detectar ruta activa
  useEffect(() => {
    setActiveRoute(window.location.pathname);
  }, []);

  // Función para alternar el menú en móviles
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Función para cerrar el menú al hacer click en un enlace
  const handleLinkClick = (path) => {
    setActiveRoute(path);
    setIsOpen(false);
  };

  // Función para manejar el cambio de país en el switch
  const handleSwitch = (country) => {
    selectedCountry.set(country);
    if (country === "mex") {
      isEnglish.set(false);
      changeLang("es"); // Cambiar idioma a español
    } else if (country === "usa") {
      isEnglish.set(false);
      changeLang("en"); // Cambiar idioma a inglés
    }
  };

  // Enlaces de navegación
  const navLinks = [
    { href: "/", label: textosNavbar.home },
    { href: "/nosotros", label: textosNavbar.about },
    { href: "/proyectos", label: textosNavbar.projects },
    { href: "/servicios", label: textosNavbar.services },
  ];

  // Enlaces de redes sociales
  const socialLinks = [
    { 
      href: "https://www.facebook.com/cblunaoficial", 
      icon: "/icons/facebook.svg", 
      alt: "Facebook",
      label: "Facebook"
    },
    { 
      href: "https://x.com/cblunaoficial", 
      icon: "/icons/twitter.svg", 
      alt: "Twitter",
      label: "Twitter"
    },
    { 
      href: "https://www.instagram.com/cblunaoficial/", 
      icon: "/icons/ins.svg", 
      alt: "Instagram",
      label: "Instagram"
    },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      {/* Efectos de fondo tecnológicos */}
      <div className={styles.techBackground}>
        <div className={styles.circuitLines}></div>
        <div className={styles.glowEffect}></div>
      </div>

      {/* Logo con efectos futuristas */}
      <div className={styles.logoContainer}>
        <div className={styles.logoGlow}></div>
        <div className={styles.logopic}>
          <img src="/favicon.png" alt="CBLUNA Logo" />
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoTitle}>CBLUNA</span>
          <span className={styles.logoSubtitle}>TECH SOLUTIONS</span>
        </div>
      </div>

      {/* Ícono de menú hamburguesa para móviles */}
      <div className={`${styles.hamburger} ${isOpen ? styles.active : ''}`} onClick={toggleMenu}>
        <div className={styles.hamburgerBox}>
          <div className={styles.hamburgerInner}></div>
        </div>
      </div>

      {/* Menú de navegación principal */}
      <ul className={`${styles.navMenu} ${isOpen ? styles.active : ""}`}>
        {navLinks.map((link) => (
          <li key={link.href} className={styles.navItem}>
            <a 
              href={link.href} 
              className={`${styles.navLink} ${activeRoute === link.href ? styles.activeLink : ''}`}
              onClick={() => handleLinkClick(link.href)}
            >
              <span className={styles.linkText}>{link.label}</span>
              <div className={styles.linkGlow}></div>
            </a>
          </li>
        ))}
        
        {/* Botón de contacto en móvil */}
        <li className={`${styles.navItem} ${styles.contactMobile}`}>
          <a 
            className={styles.buyButton} 
            href="/contacto"
            onClick={() => handleLinkClick('/contacto')}
          >
            <span>{textosNavbar.contact}</span>
            <div className={styles.buttonGlow}></div>
          </a>
        </li>

        {/* Redes sociales en móvil */}
        <li className={styles.socialMobile}>
          <div className={styles.socialTitle}>Síguenos</div>
          <div className={styles.socialGrid}>
            {socialLinks.map((social) => (
              <a 
                key={social.alt}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLinkMobile}
              >
                <img src={social.icon} alt={social.alt} className={styles.socialIconMobile} />
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </li>
      </ul>

      {/* Grupo de íconos sociales (solo desktop) */}
      <div className={styles.socialIconsGroup}>
        {socialLinks.map((social) => (
          <a 
            key={social.alt}
            href={social.href} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <img src={social.icon} alt={social.alt} className={styles.icon} />
            <div className={styles.socialGlow}></div>
          </a>
        ))}
      </div>

      {/* Switch de países con efectos futuristas */}
      <div className={styles.countrySwitch}>
        <div className={styles.switchBackground}></div>
        <div
          className={`${styles.switchIconContainer} ${country === "mex" ? styles.active : styles.inactive}`}
          onClick={() => handleSwitch("mex")}
        >
          <img src="/icons/icon_mex.webp" alt="Mexico" className={styles.switchIcon} />
          <div className={styles.countryGlow}></div>
        </div>
        <div
          className={`${styles.switchIconContainer} ${country === "usa" ? styles.active : styles.inactive}`}
          onClick={() => handleSwitch("usa")}
        >
          <img src="/icons/icon_usa.webp" alt="USA" className={styles.switchIcon} />
          <div className={styles.countryGlow}></div>
        </div>
      </div>

      {/* Botón de contacto (solo desktop) */}
      <div className={styles.contactDesktop}>
        <a 
          className={styles.buyButton} 
          href="/contacto"
          onClick={() => handleLinkClick('/contacto')}
        >
          <span>{textosNavbar.contact}</span>
          <div className={styles.buttonGlow}></div>
          <div className={styles.buttonScanline}></div>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
