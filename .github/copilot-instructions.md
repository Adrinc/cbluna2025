# Copilot Instructions - CBLuna Reborn

## Architecture Overview

This is an **Astro + React hybrid SSR application** (`output: 'server'`) using Node.js adapter in standalone mode. The architecture combines:
- **Astro pages** for routing (`src/pages/*.astro`)
- **React components** for interactive UI (`.jsx` files)
- **CSS Modules** for component styling (`.module.css`)
- **Nanostores** for global state management
- **React Context** for i18n/language switching

### Key Directories
- `src/pages/` - Astro file-based routing (index, nosotros, servicios, proyectos, contacto)
- `src/components/[page]/Secciones/` - Page-specific sections (e.g., `IndexSeccion1.jsx`)
- `src/layouts/` - Astro layouts (`Layout.astro`, `LayoutBasic.astro`, `LayoutHori.astro`)
- `src/data/` - Translations, signals, and global state
- `public/` - Static assets (fonts, icons, images, videos, Rive animations)

## Critical Patterns

### 1. **Astro Islands with React**
React components are hydrated using `client:only` directive with `transition:persist` for view transitions:
```astro
<IndexSeccion1 transition:persist client:only/>
```
**Always use this pattern** when adding React components to Astro pages. The `transition:persist` maintains component state across page navigations.

### 2. **Internationalization (i18n)**
- **State management**: `src/data/signals.jsx` provides `LangProvider` context
- **Usage in React**: Import `useLang()` hook for `{ lang, t, changeLang }`
- **Translation files**: `src/data/translations_*.js` files (separated by page/section)
  - `translations.js` - Main translations (navbar, footer, projects gallery)
  - `translations_proyectos.js` - Full project details with `demoUrl` for live demos
  - `translations_servicios.js` - Services section
  - `translations_contacto.js` - Contact form
- **Global state**: `isEnglish` nanostore (`src/data/variables.js`)

Example:
```jsx
import { useLang } from "../../data/signals";
const { t, lang, changeLang } = useLang();
// Access translations: t.navbar.home, t.solutions.title
```

**Projects with demo URLs**: When adding projects to `translations_proyectos.js`, include `demoUrl` property:
```javascript
{
  titulo: "Project Name",
  descripcion: "Description...",
  puntos: ["Feature 1", "Feature 2"],
  imagen: "/image/path.webp",
  demoUrl: "https://cbluna.com/demo_url" // Optional, shows demo button
}
```

**Wrap app with LangWrapper** in layouts:
```astro
<LangWrapper transition:persist client:only>
  <slot />
</LangWrapper>
```

### 3. **CSS Custom Properties + Tailwind**
Theme colors are defined as CSS variables in `src/layouts/LayoutHori.astro`:
```css
--primary-color: #000000;
--secondary-color: #58aafc;
```

Access in Tailwind via `tailwind.config.mjs`:
```javascript
colors: {
  primaryColor: 'var(--primary-color)',
  secondaryColor: 'var(--secondary-color)',
}
```

### 4. **Component Organization**
- **Page sections**: `src/components/[page]/Secciones/[Page]Seccion[N].jsx`
- **Shared components**: `src/components/global/`
- **React utilities**: `src/components/react_components/` (NavBar, TopMenu, RouterLinks)
- **CSS Modules**: Co-located with components (e.g., `NavBar.jsx` + `navbar.module.css`)

### 5. **Nanostores Usage**
Global state managed via nanostores (see `src/data/variables.js`):
```jsx
import { useStore } from "@nanostores/react";
import { isEnglish, selectedCountry } from "../../data/variables";

const ingles = useStore(isEnglish);
const country = useStore(selectedCountry);

// Set values:
selectedCountry.set("mex");
isEnglish.set(false);
```

## Development Workflow

### Commands
- `npm run dev` - Start dev server at `localhost:4321`
- `npm run build` - Type-check with `astro check` then build
- `npm run preview` - Preview production build locally

### Key Dependencies
- **3D/Animations**: `@react-three/fiber`, `@react-three/drei`, `gsap`, `@rive-app/react-canvas`
- **UI Libraries**: `keen-slider` (carousels), `react-transition-group`
- **Icons**: `@fortawesome/react-fontawesome`
- **Backend**: `nodemailer` (contact forms), `@supabase/supabase-js`

## Conventions

### File Naming
- **Astro pages**: lowercase (`index.astro`, `servicios.astro`)
- **React components**: PascalCase (`.jsx` extension)
- **CSS Modules**: camelCase (`.module.css`)
- **Translations**: `translations_[section].js`

### Import Patterns
- Use relative imports for local components: `../../components/global/Footer.jsx`
- Astro layouts: Always import from `../layouts/`
- Data/state: Import from `../../data/signals` or `../../data/variables`

### CSS Modules
Always import and use CSS Modules for component styles:
```jsx
import styles from "./navbar.module.css";
<div className={styles.container}>
```

## Special Considerations

1. **SSR Mode**: This is NOT a static site. Server-side rendering is enabled, so ensure React components handle `window`/`localStorage` checks:
```jsx
const browserLang = typeof window !== "undefined" 
  ? localStorage.getItem("lang") 
  : "es";
```

2. **404 Handling**: Custom 404 with Rive animation at `src/components/Page_404/Page_404.jsx`

3. **View Transitions**: Enabled globally via `<ViewTransitions />` in layouts. Use `transition:persist` to maintain state.

4. **Multi-language routes**: No separate route structure; language handled via React Context + localStorage.

## When Adding Features

- **New page**: Create `.astro` file in `src/pages/`, use `LayoutBasic`, add translations to `src/data/translations_[page].js`
- **New section**: Create `[Page]Seccion[N].jsx` in `src/components/[page]/Secciones/`, use `client:only` + `transition:persist`
- **Translations**: Add to appropriate `translations_*.js` file with `es` and `en` keys
- **Global state**: Add to `src/data/variables.js` as nanostore if needed across multiple components
