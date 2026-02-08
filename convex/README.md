# Convex Backend

Este proyecto usa [Convex](https://convex.dev) para el backend del waitlist.

## Setup

1. **Crear proyecto en Convex:**
   ```bash
   npx convex dev
   ```
   Esto te pedirá crear una cuenta/login y crear un nuevo proyecto.

2. **Configurar variable de entorno:**
   El comando anterior creará automáticamente `.env.local` con `NEXT_PUBLIC_CONVEX_URL`.

3. **Desplegar a producción:**
   ```bash
   npx convex deploy
   ```

## Estructura

- `schema.ts` — Definición de tablas (waitlist)
- `waitlist.ts` — Mutations y queries para el waitlist

## Dashboard

Ver datos en: https://dashboard.convex.dev
