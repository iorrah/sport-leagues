# Running the Project

## Prerequisites

- Node.js 24.x
- pnpm 8+ installed globally
- A valid `.env` file with TheSportsDB API values

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create your environment variables:

```bash
cp .env.example .env
```

3. Update `.env` with your API values:

```env
VITE_API_BASE_URL=https://www.thesportsdb.com/api/v1/json
VITE_API_PATH=1
VITE_API_KEY=<YOUR_API_KEY>
```

## Local development

```bash
pnpm dev
```

Open the app at `http://localhost:5173`.

## Build

```bash
pnpm build
```

This runs TypeScript build verification and Vite production build.

## Preview production build

```bash
pnpm preview
```

## Test

```bash
pnpm test
```

## Coverage

```bash
pnpm test:coverage
```

## Deployment

This project is configured to deploy to GitHub Pages via the repository workflow. The build artifact is expected at `dist/`.
