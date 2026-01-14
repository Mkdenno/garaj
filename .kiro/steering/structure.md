# Project Structure

## Root Directory
- `package.json` - Dependencies and npm scripts
- `README.md` - Project documentation
- `.gitignore` - Git ignore rules
- `node_modules/` - Installed dependencies (not committed)

## Source Code (`src/`)
Main application source code directory.

- `index.js` - Application entry point, renders root component with React.StrictMode
- `App.js` - Main application component
- `App.css` - Styles for App component
- `index.css` - Global styles
- `App.test.js` - Tests for App component
- `setupTests.js` - Test configuration
- `reportWebVitals.js` - Performance monitoring setup
- `logo.svg` - React logo asset

## Public Assets (`public/`)
Static files served directly without processing.

- `index.html` - HTML template with root div
- `favicon.ico` - Browser favicon
- `logo192.png`, `logo512.png` - PWA icons
- `manifest.json` - PWA manifest
- `robots.txt` - Search engine crawler instructions

## Conventions
- React components go in `src/`
- Component files use `.js` extension
- Test files use `.test.js` suffix
- CSS files are co-located with components
- Static assets that need processing go in `src/`
- Static assets served as-is go in `public/`
- Use functional components with hooks (modern React pattern)
- Export components as default exports
