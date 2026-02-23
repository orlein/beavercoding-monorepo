# Development Guidelines — Current State

> Last updated: 2026-02-23 (v0.1.0)

## Code Conventions

- TypeScript strict mode 전체 적용
- ESLint + Prettier — `@beavercoding/eslint-config`에서 관리
  - `./base` — 기본 (모든 패키지)
  - `./next` — Next.js 앱용
  - `./library` — DDD 패키지용 (React/Next.js 룰 없음)
- Import alias: `@/` (앱 내부)

## DDD Conventions

- Bounded Context → `packages/ddd-<context>/`
- Domain layer: 순수 함수 + Effect types만 (외부 의존성 금지)
- Value Objects: `Data.Class` 기반 immutable 객체
- Domain Errors: `Data.TaggedError` 기반
- Domain Events: `Data.TaggedClass` 기반
- Repositories: Effect `Context.Tag` 기반 interface
- Services: `Effect.gen` 기반 use cases

## Effect.ts Patterns

- Backend 로직은 Effect.ts만 사용
- `@effect/sql-drizzle` + `@effect/sql-pg` for DB access
- Services as Effect programs, composed via Layers
- Error handling: TaggedError hierarchy
- Config: `effect/Config` for environment variables

## Turborepo Pipeline

```jsonc
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "persistent": true,
      "cache": false
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "@beavercoding/supabase#generate": {
      "outputs": ["src/types.ts"]
    }
  }
}
```

## pnpm Workspace

```yaml
packages:
  - "apps/*"
  - "packages/*"
  - "supabase"
```

## Package Patterns

| Pattern | 대상 | 설명 |
|---------|------|------|
| JIT | config 패키지 | TS 소스 직접 export, 빌드 스텝 없음 |
| BUILD | `ddd-*` 패키지 | tsup ESM+CJS, `dist/` 출력, dts 포함 |

## Testing

- Framework: Vitest
- 공유 설정: `@beavercoding/vitest-config/base`
- `ddd-*` 패키지: `src/**/*.test.ts` 패턴
- `pnpm test` → Turborepo가 test task 실행

## Styling (Tailwind CSS v4 + shadcn/ui)

- 스타일링은 반드시 Tailwind CSS v4 + shadcn/ui 최신 버전 사용
- Tailwind CSS v4: CSS-first 설정 — `tailwind.config.js` 없음, `@import "tailwindcss"` 사용
- PostCSS: `@tailwindcss/postcss` 플러그인 (`postcss.config.mjs`)
- shadcn/ui: `new-york` 스타일, OKLCH 색상, `tw-animate-css` 애니메이션
- 공유 UI: `packages/ui/` (`@beavercoding/ui`)
  - `src/styles/globals.css` — 테마 변수 + Tailwind 설정
  - `src/lib/utils.ts` — `cn()` 유틸리티
  - `src/components/` — shadcn/ui 컴포넌트
- 앱 CSS: `src/app/globals.css` → `@import "@beavercoding/ui/globals.css"`
- 컴포넌트 추가: `npx shadcn@latest add <component>` (packages/ui 디렉토리에서)
- Import 패턴:
  - `import { Button } from "@beavercoding/ui/components/button"`
  - `import { cn } from "@beavercoding/ui/lib/utils"`

## Drizzle ORM

- Config: `/drizzle.config.ts` — schema glob `packages/ddd-*/src/infrastructure/schema/*.ts`
- Migrations: `supabase/migrations/`
- Schema: `pgTable` + `pgPolicy` with Supabase RLS
- Commands: `pnpm db:generate`, `pnpm db:migrate`, `pnpm db:push`

## Claude Code Rules

1. `karpathy-guidelines` 스킬 항상 적용
2. React 코드 → `vercel-react-best-practices` 스킬 적용
3. Effect.ts 코드 → `effect-ts` 스킬 적용
4. Drizzle ORM → `drizzle-orm`, `postgres-drizzle` 스킬 적용
5. DDD/Hexagonal → `clean-ddd-hexagonal` 스킬 적용
6. 기존 파일 수정 우선, 새 파일 최소화
7. 공유 로직은 `packages/`, 앱 전용은 `apps/`
8. Supabase 타입/클라이언트는 `@beavercoding/supabase`에서 관리
9. 제네릭 `utils` 패키지 금지 — 도메인별 패키지로 분리
10. semver 버저닝, `history/v<version>/` 기록, `history/CURRENT/` 업데이트
11. 스타일링은 반드시 Tailwind CSS v4 + shadcn/ui 최신 버전 사용
12. UI 컴포넌트 → `@beavercoding/ui` 공유 패키지에 배치
13. shadcn/ui 컴포넌트 추가: `npx shadcn@latest add <component>` (packages/ui에서)
