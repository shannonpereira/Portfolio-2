# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # new-folder6

  Vite + React + TypeScript starter project.

  This repository uses Vite, React 19, and TypeScript. It includes ESLint and Tailwind-related tooling.

  **Quickstart**

  Prerequisites:
  - Node.js 18+ (or the version compatible with your installed packages)

  Install dependencies:

  ```bash
  npm install
  ```

  Run development server:

  ```bash
  npm run dev
  ```

  Build for production:

  ```bash
  npm run build
  ```

  Preview production build locally:

  ```bash
  npm run preview
  ```

  Run linter:

  ```bash
  npm run lint
  ```

  Available scripts (from `package.json`):
  - `dev`: starts Vite dev server
  - `build`: runs `tsc -b` then `vite build`
  - `preview`: previews the production build (`vite preview`)
  - `lint`: runs `eslint .`

  Project structure (important files):
  - [index.html](index.html)
  - [vite.config.ts](vite.config.ts)
  - [tsconfig.json](tsconfig.json)
  - [src/main.tsx](src/main.tsx)
  - [src/App.tsx](src/App.tsx)

  Git and environment notes:
  - A `.gitignore` has been added to ignore `node_modules`, build outputs (`dist`, `build`, `.vite`), caches, local environment files (`.env`), editor settings (`.vscode`) and OS files like `.DS_Store`.
  - Keep a sample env file like `.env.example` in the repo and do not commit real secrets.

  Contributing:
  - Fork and open a PR. Keep changes small and focused.

  License: add a `LICENSE` file if you intend to open-source this project.

  If you'd like, I can also:
  - add a `CONTRIBUTING.md` or `LICENSE`
  - initialize a Git repository and make an initial commit
  - help set up a GitHub Actions workflow for CI
