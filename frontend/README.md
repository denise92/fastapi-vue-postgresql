# frontend

Vue 3 + Vite + Vite SSG frontend.

## Requirements

- Node.js 20.x
- Yarn 1.x
- Tailwind CSS 4.x

If you use `nvm`, run:

```bash
nvm use 20
```

## Install

```bash
yarn install
```

## Local development

```bash
yarn dev
```

## Build (SPA)

```bash
yarn build
```

## Build (SSG)

```bash
yarn build:ssg
```

## Preview

```bash
yarn preview
```

## Generate API client (Hey API)

```bash
yarn api:generate
```

By default it reads `http://127.0.0.1:8000/api/v1/openapi.json` from `openapi-ts.config.ts` and writes generated files to `src/client`.

## i18n

The app uses `vue-i18n` with a global instance in `src/i18n/index.ts` (default locale: `zh-TW`, fallback: `en`).
