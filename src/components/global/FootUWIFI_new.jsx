import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../data/variables';
import styles from './css/footuwifi.module.css';

const FootUWIFI = () => {
  const ingles = useStore(isEnglish);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Social media links
  const socialLinks = [
    { 
      href: "https://www.facebook.com/cblunaoficial", 
      icon: "/icons/facebook.svg", 
      name: "facebook",
      label: "Facebook"
    },
    { 
      href: "https://x.com/cblunaoficial", 
      icon: "/icons/twitter.svg", 
      name: "twitter",
      label: "Twitter"
    },
    { 
      href: "https://www.instagram.com/cblunaoficial/", 
      icon: "/icons/insta.svg", 
      name: "instagram",
      label: "Instagram"
    },
    { 
      href: "https://linkedin.com/company/cbluna", 
      icon: "/icons/linkedin.svg", 
      name: "linkedin",
      label: "LinkedIn"
    }
  ];

  return (
    <footer className={styles.footer}>
      {/* Simple background effect */}
      <div className={styles.backgroundGlow}></div>
      
      <div className={styles.container}>
        {/* Main content in single row */}
        <div className={styles.content}>
          {/* Company info */}
          <div className={styles.companyInfo}>
            <div className={styles.logoSection}>
              <img src="/favicon.png" alt="CBLUNA Logo" className={styles.logo} />
              <div className={styles.companyText}>
                <h3 className={styles.companyName}>CBLUNA</h3>
                <p className={styles.companyDescription}>
                  {ingles ? 
                    "CBLUNA is the leading solution in MDf/JDF infrastructure management, providing total control and real-time visibility of your network assets." :
                    "CBLUNA es la solución líder en gestión de infraestructura MDf/JDF, proporcionando control total y visibilidad en tiempo real de tus activos de red."
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div className={styles.linksSection}>
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>{ingles ? "Company" : "Compañía"}</h4>
              <ul className={styles.linkList}>
                <li><a href="/nosotros" className={styles.link}>{ingles ? "About Us" : "Sobre Nosotros"}</a></li>
                <li><a href="/proyectos" className={styles.link}>{ingles ? "Projects" : "Proyectos"}</a></li>
                <li><a href="/servicios" className={styles.link}>{ingles ? "Services" : "Servicios"}</a></li>
                <li><a href="/contacto" className={styles.link}>{ingles ? "Contact" : "Contacto"}</a></li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>{ingles ? "Legal" : "Legal"}</h4>
              <ul className={styles.linkList}>
                <li><a href="#" className={styles.link}>{ingles ? "Terms of Service" : "Términos de Servicio"}</a></li>
                <li><a href="#" className={styles.link}>{ingles ? "Privacy Policy" : "Política de Privacidad"}</a></li>
                <li><a href="#" className={styles.link}>Cookies</a></li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>{ingles ? "Support" : "Soporte"}</h4>
              <ul className={styles.linkList}>
                <li><a href="#" className={styles.link}>{ingles ? "Help Center" : "Centro de Ayuda"}</a></li>
                <li><a href="#" className={styles.link}>{ingles ? "Documentation" : "Documentación"}</a></li>
                <li><a href="#" className={styles.link}>{ingles ? "System Status" : "Estado del Sistema"}</a></li>
              </ul>
            </div>
          </div>

          {/* Contact info */}
          <div className={styles.contactSection}>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📍</span>
              <div className={styles.contactText}>
                <strong>Torre CBLUNA</strong><br />
                Av. Tecnológica 2324<br />
                Ciudad de México, México
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📧</span>
              <div className={styles.contactText}>
                <a href="mailto:contacto@cbluna.com" className={styles.contactLink}>
                  contacto@cbluna.com
                </a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📞</span>
              <div className={styles.contactText}>
                <a href="tel:+525512345678" className={styles.contactLink}>
                  +52 (55) 1234-5678
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © 2025 CBLUNA. {ingles ? "All rights reserved." : "Todos los derechos reservados."}
          </div>
          
          {/* Social links */}
          <div className={styles.socialLinks}>
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={social.label}
              >
                <img src={social.icon} alt={social.label} className={styles.socialIcon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className={styles.backToTop}
        aria-label={ingles ? "Back to top" : "Volver arriba"}
      >
        <svg className={styles.backToTopIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
        </svg>
      </button>
    </footer>
  );
};

export default FootUWIFI;
