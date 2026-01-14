# Technology Stack

## Core Technologies
- React 19.2.3 (latest)
- React DOM 19.2.3
- JavaScript (ES6+)

## Build System
- Create React App (react-scripts 5.0.1)
- Webpack (bundled with CRA)
- Babel (bundled with CRA)

## Testing
- Jest (bundled with CRA)
- React Testing Library (@testing-library/react)
- @testing-library/jest-dom for DOM assertions
- @testing-library/user-event for user interaction simulation

## Other Libraries
- web-vitals for performance monitoring

## Common Commands

### Development
```bash
npm start
```
Starts development server at http://localhost:3000 with hot reload.

### Testing
```bash
npm test
```
Runs tests in interactive watch mode. For CI/CD, use `npm test -- --watchAll=false`.

### Production Build
```bash
npm run build
```
Creates optimized production build in `build/` folder.

### Eject (Not Recommended)
```bash
npm run eject
```
One-way operation that exposes all configuration. Avoid unless absolutely necessary.

## Code Style
- ESLint configured with `react-app` and `react-app/jest` presets
- Follow React functional component patterns
- Use React hooks for state and side effects
