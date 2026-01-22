import React from 'react';
import { useStore } from '@nanostores/react';
import { isEnglish } from '../../../../data/variables';
import styles from '../css/tableSection.module.css';

const SettingsSection = ({ configData }) => {
  const ingles = useStore(isEnglish);

  return (
    <div className={styles.tableSection}>
      <div className={styles.sectionHeader}>
        <h3>{ingles ? 'System Configuration' : 'Configuración del Sistema'}</h3>
        <button className={styles.saveButton}>
          💾 {ingles ? 'Save Changes' : 'Guardar Cambios'}
        </button>
      </div>
      
      {/* Vista de tabla para desktop y tablet */}
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>{ingles ? 'Category' : 'Categoría'}</th>
                <th>{ingles ? 'Parameter' : 'Parámetro'}</th>
                <th>{ingles ? 'Value' : 'Valor'}</th>
                <th>{ingles ? 'Description' : 'Descripción'}</th>
                <th>{ingles ? 'Actions' : 'Acciones'}</th>
              </tr>
            </thead>
            <tbody>
              {configData.map((config, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td>
                    <span className={styles.categoryTag}>{config.categoria}</span>
                  </td>
                  <td>{config.parametro}</td>
                  <td>
                    <input 
                      type="text" 
                      defaultValue={config.valor} 
                      className={styles.configInput}
                    />
                  </td>
                  <td className={styles.descriptionCell}>{config.descripcion}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button className={styles.actionBtn} title={ingles ? 'Save' : 'Guardar'}>✓</button>
                      <button className={styles.actionBtn} title={ingles ? 'Reset' : 'Restablecer'}>↻</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vista de tarjetas para móviles */}
      <div className={styles.cardsContainer}>
        {configData.map((config, index) => (
          <div key={index} className={styles.inventoryCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardId}>#{index + 1}</div>
              <div className={styles.cardActions}>
                <button className={styles.cardActionBtn} title={ingles ? 'Save' : 'Guardar'}>✓</button>
                <button className={styles.cardActionBtn} title={ingles ? 'Reset' : 'Restablecer'}>↻</button>
              </div>
            </div>
            
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>
                <span className={styles.categoryTag}>{config.categoria}</span>
              </div>
              
              <div className={styles.cardInfo}>
                <div className={styles.cardField}>
                  <span className={styles.cardLabel}>{ingles ? 'Parameter' : 'Parámetro'}:</span>
                  <span className={styles.cardValue}>{config.parametro}</span>
                </div>
                
                <div className={styles.cardField}>
                  <span className={styles.cardLabel}>{ingles ? 'Value' : 'Valor'}:</span>
                  <div className={styles.cardValue}>
                    <input 
                      type="text" 
                      defaultValue={config.valor} 
                      className={styles.configInputMobile}
                    />
                  </div>
                </div>
                
                <div className={styles.cardField}>
                  <span className={styles.cardLabel}>{ingles ? 'Description' : 'Descripción'}:</span>
                  <span className={styles.cardValue}>{config.descripcion}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsSection;