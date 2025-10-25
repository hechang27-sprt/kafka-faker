# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kafka-faker is a Nuxt 4 application for managing and interacting with Kafka instances. It provides a web interface for consuming, producing, and managing Kafka topics across multiple Kafka clusters.

## Commands

### Development
- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm postinstall` - Run Nuxt preparation (automatically runs after install)

### Linting
This project uses ESLint with Nuxt's configuration:
- ESLint config is in `eslint.config.mjs`
- Vue multi-word component names rule is disabled
- Unused vars starting with `_` are ignored

## Architecture

### Tech Stack
- **Framework**: Nuxt 4 with Vue 3
- **State Management**: Pinia stores
- **UI Components**: Element Plus
- **Styling**: UnoCSS for utility-first CSS
- **API Layer**: tRPC with superjson transformer for end-to-end type safety
- **Kafka Client**: kafkajs for Kafka operations

### Key Architectural Patterns

#### tRPC Integration
The app uses tRPC for type-safe API communication between client and server:
- **Server-side**: Router defined in `server/trpc/routers/index.ts`, exposed via `server/api/trpc/[trpc].ts`
- **Client-side**: Plugin in `app/plugins/trpc.ts` provides `$trpc` to all components
- Uses superjson for serialization to support complex types (Dates, Maps, Sets, etc.)
- Type safety flows from `AppRouter` export to client via `trpc-nuxt`

#### State Management

**Instance Store** (`app/stores/kafka.ts`):
- Primary Pinia store managing Kafka instance configurations (brokers, auth)
- Supports multiple SASL authentication mechanisms (plain, SCRAM, OAuth)
- Provides readonly access to instances collection
- Methods: `addInstance()`, `removeInstance()`

**Menu Composable** (`app/composables/menu.ts`):
- Composable function that derives navigation menu structure from instance store
- Exports `useMenuData()` which returns computed `menuData` property
- Reactively computes menu structure when instances change
- Creates URL-encoded path segments for instance routing
- No persistent state - purely derived/computed data

#### Routing Structure
- Dynamic routes under `app/pages/instance/[bootstrapServer]/` for instance-specific pages
- Pages: `consume.vue`, `produce.vue`, `topics.vue` (recently moved from old structure)
- `bootstrapServer` param is the URL-encoded instance client ID

#### Component Patterns
- **TreeMenu system**: Hierarchical menu component (`app/components/menu/TreeMenu.vue`) with recursive rendering via `TreeMenuInner` and `TreeMenuChild`
- **Context passing**: Uses custom `ProvideProps` component for context injection
- Layout: `app/layouts/default.vue` provides header/sidebar structure using Element Plus container components

### Data Flow
1. Kafka instances are defined in instance store
2. Menu composable (`useMenuData()`) reactively computes navigation from instances
3. SidePanel displays TreeMenu with computed menu data
4. Routing via `[bootstrapServer]` dynamic param selects active instance
5. tRPC procedures communicate with server for Kafka operations

### File Structure Conventions
- `app/pages/` - File-based routing (Nuxt convention)
- `app/components/` - Auto-imported Vue components (pathPrefix disabled)
- `app/composables/` - Composable functions (auto-imported by Nuxt)
- `app/stores/` - Pinia stores
- `app/utils/` - Shared TypeScript utilities and types
- `server/trpc/` - tRPC server configuration and routers
- `server/api/` - Nuxt server API routes

### Storage
Nitro storage configured to use filesystem driver at `./.data/db` for persistent data.

## Development Notes

- Component auto-import is enabled with `pathPrefix: false`, so components are imported by exact filename
- TypeScript configuration extends from `.nuxt/tsconfig.app.json`
- The project is a pnpm workspace (see `pnpm-workspace.yaml`)
- Nitro is configured to transpile `trpc-nuxt` for SSR compatibility
