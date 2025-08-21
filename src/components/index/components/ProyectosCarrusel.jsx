import { translations } from '../../../data/translations';
import { isEnglish } from '../../../data/variables';
import { useStore } from '@nanostores/react';
import CardCarrusel from './CardCarrusel.jsx';
import styles from './ProyectosCarrusel.module.css';

const proyectos = [
	{ key: 'codigo_barras', imagen: '/image/carrusel_proyectos/codigo_barras.webp' },
	{ key: 'compras', imagen: '/image/carrusel_proyectos/compras.webp' },
	{ key: 'control_evento', imagen: '/image/carrusel_proyectos/control_evento.webp' },
	{ key: 'control_visitas', imagen: '/image/carrusel_proyectos/control_visitas.jpeg' },
	{ key: 'crm', imagen: '/image/carrusel_proyectos/crm.webp' },
	{ key: 'dashboards', imagen: '/image/carrusel_proyectos/dashboards.png' },
	{ key: 'diseñosweb', imagen: '/image/carrusel_proyectos/diseñosweb.webp' },
	{ key: 'facturacion', imagen: '/image/carrusel_proyectos/facturacion.png' },
	{ key: 'gestion_flotas', imagen: '/image/carrusel_proyectos/gestion_flotas.webp' },
	{ key: 'inventario', imagen: '/image/carrusel_proyectos/inventario.jpeg' },
	{ key: 'recursos_humanos', imagen: '/image/carrusel_proyectos/recursos_humanos.png' }
];

const ProyectosCarrusel = () => {
	const ingles = useStore(isEnglish);
	const t = ingles ? translations.en : translations.es;

	return (
		<div className={styles.carruselContainer}>
			<div className={styles.carrusel} aria-hidden="true">
				{proyectos.concat(proyectos).map((proyecto, index) => {
					const info = t.projectsCarrusel?.[proyecto.key] || {};
					return (
						<CardCarrusel
							key={index}
							titulo={info.titulo || proyecto.key}
							subtitulo={info.subtitulo || ''}
							imagen={proyecto.imagen}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ProyectosCarrusel;
