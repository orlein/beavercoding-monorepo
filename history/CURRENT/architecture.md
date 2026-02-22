# Architecture — Current State

> Last updated: 2026-02-22

## Tech Stack

| Category | Choice |
|----------|--------|
| Package Manager | pnpm (workspace) |
| Build System | Turborepo |
| Framework | Next.js (App Router) |
| Backend/DB | Supabase (Auth, Database, Storage) |
| Language | TypeScript (strict) |

## Package Strategy

**Internal Packages (JIT) 패턴** — 빌드 스텝 없이 TypeScript 소스 직접 export.

### Active Packages

| Package | Scope | 역할 |
|---------|-------|------|
| `apps/web` | `@beavercoding/web` | Next.js 메인 앱 |
| `packages/typescript-config` | `@beavercoding/typescript-config` | 공유 tsconfig |
| `packages/eslint-config` | `@beavercoding/eslint-config` | 공유 ESLint 룰 |
| `packages/supabase` | `@beavercoding/supabase` | Supabase 클라이언트, 타입 |

### Deferred (필요 시 생성)

- `packages/ui` — 두 번째 앱 추가 시
- `packages/<domain>-utils` — 3곳 이상 중복 시, 도메인 이름으로 생성

### Rejected

- `packages/utils` — 잡동사니 안티패턴
- `packages/config` (통합) — ESLint/TS 설정은 분리 관리

## Directory Structure

```
beavercoding-monorepo/
├── apps/
│   └── web/                           # Next.js App Router
│       ├── app/
│       ├── components/                # 앱 전용 UI (colocate)
│       └── package.json
├── packages/
│   ├── typescript-config/             # 공유 tsconfig
│   ├── eslint-config/                 # 공유 ESLint
│   └── supabase/                      # Supabase 클라이언트 + 타입
├── supabase/                          # Supabase CLI workspace
│   ├── migrations/
│   └── config.toml
├── turbo.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

## Supabase

- `supabase/` — CLI workspace (migrations, seed, config)
- `packages/supabase/` — 앱에서 사용하는 클라이언트와 자동 생성 타입
- 타입 생성: `supabase gen types typescript` → `packages/supabase/src/types.ts`
- 환경변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

## Git Strategy

- `main` — 프로덕션
- `dev` — 개발
- `feat/*`, `fix/*` — 작업 브랜치
