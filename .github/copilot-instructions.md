# CBL LUNA Reborn - AI Coding Agent Instructions

## Project Overview
**Tech Stack:** Astro 4 + React 18 + Tailwind CSS + Three.js + Rive animations
**Type:** Full-stack portfolio/solutions website with server-side rendering (Node.js adapter)
**Key Features:** I18n (ES/EN), component-based UI, 3D animations, multi-section landing page

## Architecture & Component Structure

### Page Organization
- **Pages** (`src/pages/`): Route-based pages - `index.astro`, `servicios.astro`, `proyectos.astro`, `nosotros.astro`, `contacto.astro`
- **Sections** (`src/components/*/Secciones/`): Reusable section components imported into pages (e.g., `IndexSeccion1-6.jsx`)
- **Layouts** (`src/layouts/`): `Layout.astro` (main), `LayoutBasic.astro`, `LayoutHori.astro` wrap pages with nav/footer

### Component Patterns

**Astro Components** (.astro):
- Navigation/global: `TopMenuSuffle.astro`, `FootUWIFI.astro`
- Used for static markup and layout composition
- Import React components via `client:only` directive for interactivity

**React Components** (.jsx):
- Interactive UI: `TechProjectGallery.jsx`, `NavBar.jsx`, `TopMenu.jsx`, section components
- Always use CSS Modules (`*.module.css`) for styling
- Example structure (from `TechProjectGallery.jsx`):
  ```jsx
  import styles from '../css/techProjectGallery.module.css';
  // Uses: nanostores for state, translations object, defaultData arrays
  ```

## Internationalization & Translations

**Translation System:**
- **Source:** `src/data/translations.js` (740+ lines, dual language objects for `es` and `en`)
- **Keys:** Organized by feature (`projectsCarrusel`, `navbar`, `solutions`, etc.)
- **Access Pattern:**
  ```jsx
  const ingles = useStore(isEnglish); // from nanostores
  const t = ingles ? translations.en : translations.es;
  // Then use: t.navbar.title, t.projectsCarrusel[projectKey].titulo
  ```
- **Language Switch:** Uses `isEnglish` atom in `src/data/variables.js`; always check if key exists with fallback: `info.titulo || project.key`

## State Management

**Primary System:** Nanostores (`src/data/variables.js`)
- `isEnglish` (atom): Boolean for current language
- `selectedCountry` (atom): Persists to localStorage
- Access in React: `const state = useStore(atomName);`

**Secondary:** Context API (via `LangWrapper` + `signals.jsx`) for language-aware contexts

## Styling Conventions

**CSS Modules:** Always use, naming: `*.module.css`
- Scope classes to module: `.galleryContainer`, `.projectCard`
- Complex animations use CSS custom properties: `--delay`, `--x`, `--y`, `--index`
- Tailwind for utilities in `.astro` files

**Color System:** CSS variables (defined globally)
- `--primary-color`, `--secondary-color`, `--primary-text-color`
- Theme colors in `tailwind.config.mjs` reference these variables
- Applied via `primaryBg`, `secondaryGradient` classes

## Critical Data Patterns

**Default Data Arrays:** Component templates often include inline default data
- Example: `TechProjectGallery.jsx` line 9-50 defines `defaultProjects` array with keys matching translation keys
- Pattern: `key` field links to translation path, `imagen` uses `/image/carrusel_proyectos/` directory

**Translation Key Naming:** Use snake_case for nested objects, camelCase for direct keys
- Correct: `translations.es.projectsCarrusel['codigo_barras'].titulo`
- Match project array `key` field to translation key exactly

## Build & Development Commands

- **Dev Server:** `npm run dev` (localhost:4321)
- **Build:** `npm run build` (runs `astro check` first, then builds to `/dist/`)
- **Preview:** `npm run preview` (local production preview)
- **Type Checking:** `astro check` (built into build process)

## File Structure Rules

- **No mix-and-match frameworks in same directory** - keep Astro components separate from React
- **Public assets:** Place in `public/` (images in `/image/`, icons in `/icons/`, fonts in `/fonts/`)
- **Translations:** Always add new feature translations to `src/data/translations.js` for both `es` and `en` objects

## Common Integration Points

1. **Adding a new section:** Create `.jsx` in `src/components/[sectionName]/Secciones/`, import in page `.astro` with `client:only`
2. **Adding translations:** Update both `translations.es` and `translations.en` objects in `translations.js`
3. **New page:** Create `.astro` in `src/pages/`, use `Layout` wrapper, import section components
4. **3D/Animation assets:** Use `@rive-app/react-webgl2` for Rive, Three.js for 3D (loaded via `@react-three/fiber`)

## Dependencies to Know

- **Animations:** GSAP, Rive, Three.js (via r3f), keen-slider, react-transition-group
- **UI Utilities:** FontAwesome icons, Tailwind with tailwindcss-animated plugin
- **Database/Backend:** Supabase integration (credentials in env vars)
- **Email:** Nodemailer for contact forms

## Performance & Rendering

- **SSR Enabled:** Site renders on Node.js server - avoid browser-only APIs in initial render
- **Client Directives:** Use `client:only` for interactive React components, not `client:load` (performance)
- **Lazy Loading:** Images use webp format, check for `imagen` field in component data
- **Transitions:** Astro ViewTransitions enabled in Layout for page navigation smoothness

---

**When in doubt:** Check `TechProjectGallery.jsx` as the reference implementation for React components, and `Layout.astro` for Astro patterns.
