# v0.1.0 Plan — Foundation + DDD Infrastructure

> Created: 2026-02-22

## Goals

- Drizzle ORM + Supabase RLS integration
- Effect.ts backend infrastructure + @effect/sql-drizzle
- DDD bounded context (hexagonal architecture) pattern
- 5 app scaffold (homepage, admin, beaver-world, beaver-pass, beaver-reporter)
- Test infrastructure (vitest)

## Phases

1. **Foundation**: Skills install, CLAUDE.md update, history creation
2. **Shared Infrastructure**: effect-infra, vitest-config, eslint-config/library, root config updates
3. **Rename**: apps/web → apps/homepage
4. **New Apps**: admin, beaver-world, beaver-pass, beaver-reporter scaffold
5. **DDD Content**: packages/ddd-content bounded context with full DDD structure
6. **Verification**: build, test, lint
7. **Documentation**: history/CURRENT update, execution log

## Key Decisions

- `ddd-*` packages use BUILD pattern (tsup) — need dist/ for app consumption
- Config packages remain JIT pattern — TS source direct export
- Effect.ts for all backend logic, composed via Layers
- Drizzle schema colocated in each DDD package's infrastructure/schema/
- Single drizzle.config.ts at root globs all DDD schema files
