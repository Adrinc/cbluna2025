import React, { useState, useRef, useEffect } from 'react';
import styles from './FormContacto.module.css';
import { isEnglish } from '../../../data/variables';
import { useStore } from '@nanostores/react';
import { contactoTranslations } from '../../../data/translations_contacto';

const FormContacto = () => {
  const ingles = useStore(isEnglish);
  const t = ingles ? contactoTranslations.en.form : contactoTranslations.es.form;
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ayuda: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const formRef = useRef(null);

  // Enhanced validation with real-time feedback
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === 'nombre') {
      const filteredValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
      setFormData({ ...formData, [name]: filteredValue });
      if (!/^[a-zA-ZÀ-ÿ\s]*$/.test(value)) {
        newErrors.nombre = t.errors.nombre;
      } else {
        delete newErrors.nombre;
      }
    } else if (name === 'telefono') {
      const filteredValue = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: filteredValue });
      if (!/^\d*$/.test(value)) {
        newErrors.telefono = t.errors.telefono;
      } else {
        delete newErrors.telefono;
      }
    } else if (name === 'email') {
      setFormData({ ...formData, [name]: value });
      if (!/^.{4,}@/.test(value)) {
        newErrors.email = t.errors.emailShort;
      } else {
        delete newErrors.email;
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setErrors(newErrors);
  };

  const validate = () => {
    const newErrors = {};

    if (!/^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(formData.nombre)) {
      newErrors.nombre = t.errors.nombre;
    }
    if (!/^.{4,}@[\w-]+\.[a-z]{2,}$/.test(formData.email)) {
      newErrors.email = t.errors.email;
    }
    if (!/^\d{10,15}$/.test(formData.telefono)) {
      newErrors.telefono = t.errors.telefono;
    }
    if (formData.ayuda.trim() === '') {
      newErrors.ayuda = t.errors.ayuda;
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    setErrors({});

    const [first, ...rest] = formData.nombre.trim().split(' ');
    const last = rest.length > 0 ? rest.join(' ') : '';

    const payload = {
      lead_email: formData.email,
      lead_phone: formData.telefono,
      lead_first_name: first,
      lead_last_name: last,
      lead_message: formData.ayuda,
      organization_id: "6"
    };

    try {
      const response = await fetch("https://u-n8n.virtalus.cbluna-dev.com/webhook/contactus_process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ nombre: '', email: '', telefono: '', ayuda: '' });
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add form interaction effects
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleFocus = (e) => setFocusedField(e.target.name);
    const handleBlur = () => setFocusedField(null);

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });

    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      });
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Status Messages */}
      {submitStatus && (
        <div className={`${styles.statusMessage} ${styles[submitStatus]}`}>
          <div className={styles.statusIcon}>
            {submitStatus === 'success' ? '✅' : '❌'}
          </div>
          <div className={styles.statusText}>
            {submitStatus === 'success' ? t.messages.success : t.messages.error}
          </div>
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
        {/* Name Field */}
        <div className={`${styles.field} ${focusedField === 'nombre' ? styles.focused : ''}`}>
          <label className={styles.label} htmlFor="nombre">
            {t.fields.nombre}
          </label>
          <div className={styles.inputContainer}>
            <div className={styles.iconWrapper}>
              <img src="./icons/user.svg" alt="User Icon" className={styles.icon} />
            </div>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className={`${styles.input} ${errors.nombre ? styles.error : ''}`}
              value={formData.nombre}
              onChange={handleChange}
              placeholder={t.placeholders.nombre}
              disabled={isSubmitting}
            />
            <div className={styles.inputGlow}></div>
          </div>
          {errors.nombre && (
            <div className={styles.errorMessage}>
              <span className={styles.errorIcon}>⚠️</span>
              {errors.nombre}
            </div>
          )}
        </div>

        {/* Email Field */}
        <div className={`${styles.field} ${focusedField === 'email' ? styles.focused : ''}`}>
          <label className={styles.label} htmlFor="email">
            {t.fields.email}
          </label>
          <div className={styles.inputContainer}>
            <div className={styles.iconWrapper}>
              <img src="./icons/email.svg" alt="Email Icon" className={styles.icon} />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder={t.placeholders.email}
              disabled={isSubmitting}
            />
            <div className={styles.inputGlow}></div>
          </div>
          {errors.email && (
            <div className={styles.errorMessage}>
              <span className={styles.errorIcon}>⚠️</span>
              {errors.email}
            </div>
          )}
        </div>

        {/* Phone Field */}
        <div className={`${styles.field} ${focusedField === 'telefono' ? styles.focused : ''}`}>
          <label className={styles.label} htmlFor="telefono">
            {t.fields.telefono}
          </label>
          <div className={styles.inputContainer}>
            <div className={styles.iconWrapper}>
              <img src="./icons/phone.svg" alt="Phone Icon" className={styles.icon} />
            </div>
            <input
              type="text"
              id="telefono"
              name="telefono"
              className={`${styles.input} ${errors.telefono ? styles.error : ''}`}
              value={formData.telefono}
              onChange={handleChange}
              placeholder={t.placeholders.telefono}
              disabled={isSubmitting}
            />
            <div className={styles.inputGlow}></div>
          </div>
          {errors.telefono && (
            <div className={styles.errorMessage}>
              <span className={styles.errorIcon}>⚠️</span>
              {errors.telefono}
            </div>
          )}
        </div>

        {/* Message Field */}
        <div className={`${styles.field} ${focusedField === 'ayuda' ? styles.focused : ''}`}>
          <label className={styles.label} htmlFor="ayuda">
            {t.fields.ayuda}
          </label>
          <div className={styles.inputContainer}>
            <div className={styles.iconWrapper}>
              <img src="../icons/help.svg" alt="Help Icon" className={styles.icon} />
            </div>
            <textarea
              id="ayuda"
              name="ayuda"
              className={`${styles.textarea} ${errors.ayuda ? styles.error : ''}`}
              value={formData.ayuda}
              onChange={handleChange}
              placeholder={t.placeholders.ayuda}
              rows="4"
              disabled={isSubmitting}
            />
            <div className={styles.inputGlow}></div>
          </div>
          {errors.ayuda && (
            <div className={styles.errorMessage}>
              <span className={styles.errorIcon}>⚠️</span>
              {errors.ayuda}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
          disabled={isSubmitting}
        >
          <span className={styles.buttonText}>
            {isSubmitting ? t.submitting : t.button}
          </span>
          <div className={styles.buttonIcon}>
            {isSubmitting ? '⏳' : '🚀'}
          </div>
          <div className={styles.buttonGlow}></div>
          <div className={styles.ripple}></div>
        </button>

        {/* Form Security Badge */}
        <div className={styles.securityBadge}>
          <div className={styles.securityIcon}>🔒</div>
          <span className={styles.securityText}>{t.security}</span>
        </div>
      </form>
    </div>
  );
};

export default FormContacto;