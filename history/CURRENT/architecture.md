# Architecture — Current State

> Last updated: 2026-02-22 (v0.1.0)

## Tech Stack

| Category | Choice |
|----------|--------|
| Package Manager | pnpm (workspace) |
| Build System | Turborepo |
| Framework | Next.js 15 (App Router) |
| Backend/DB | Supabase (Auth, Database, Storage) |
| ORM | Drizzle ORM (Supabase RLS) |
| Backend Logic | Effect.ts + @effect/sql-drizzle |
| Language | TypeScript (strict) |
| Testing | Vitest |
| DDD Build | tsup (ESM+CJS) |

## Package Strategy

- **JIT (Just-In-Time)**: config 패키지 — 빌드 없이 TS 소스 직접 export
- **BUILD**: `ddd-*` 패키지 — tsup으로 ESM+CJS 빌드, `dist/` 출력

## Active Packages

### Apps

| Package | Scope | 역할 | Port |
|---------|-------|------|------|
| `apps/homepage` | `@beavercoding/homepage` | 홈페이지 + 블로그 | 3000 |
| `apps/admin` | `@beavercoding/admin` | 관리자 대시보드 | 3001 |
| `apps/beaver-world` | `@beavercoding/beaver-world` | 커뮤니티 (placeholder) | 3002 |
| `apps/beaver-pass` | `@beavercoding/beaver-pass` | OAuth 인증모듈 (placeholder) | 3003 |
| `apps/beaver-reporter` | `@beavercoding/beaver-reporter` | 데이터 수집 (placeholder) | 3004 |

### Shared Packages

| Package | Scope | Pattern | 역할 |
|---------|-------|---------|------|
| `packages/typescript-config` | `@beavercoding/typescript-config` | JIT | 공유 tsconfig |
| `packages/eslint-config` | `@beavercoding/eslint-config` | JIT | 공유 ESLint (base, next, library) |
| `packages/supabase` | `@beavercoding/supabase` | JIT | Supabase 클라이언트, 타입 |
| `packages/effect-infra` | `@beavercoding/effect-infra` | JIT | Effect.ts 공유 인프라 (DB, config, errors) |
| `packages/vitest-config` | `@beavercoding/vitest-config` | JIT | Vitest 공유 설정 |

### DDD Bounded Contexts

| Package | Scope | Pattern | 역할 |
|---------|-------|---------|------|
| `packages/ddd-content` | `@beavercoding/ddd-content` | BUILD (tsup) | 콘텐츠 도메인 (블로그, 정적 콘텐츠) |

## DDD Architecture

```
packages/ddd-<context>/
└── src/
    ├── domain/
    │   ├── entities/          # 도메인 엔티티
    │   ├── value-objects/     # 값 객체 (immutable)
    │   ├── events/            # 도메인 이벤트
    │   └── errors/            # 도메인 에러
    ├── application/
    │   ├── services/          # Use cases (Effect programs)
    │   ├── dtos/              # Data Transfer Objects
    │   └── mappers/           # Entity ↔ DTO 변환
    └── infrastructure/
        ├── ports/
        │   ├── inbound/       # Port interfaces
        │   └── outbound/      # Repository interfaces (Effect Context tags)
        ├── adapters/outbound/ # Drizzle 구현체
        ├── schema/            # Drizzle 테이블 + Supabase RLS policies
        └── layer.ts           # Effect Layer composition
```

## Directory Structure

```
beavercoding-monorepo/
├── apps/
│   ├── homepage/                      # Next.js (홈페이지 + 블로그)
│   ├── admin/                         # Next.js (관리자)
│   ├── beaver-world/                  # Next.js (커뮤니티, placeholder)
│   ├── beaver-pass/                   # Next.js (인증, placeholder)
│   └── beaver-reporter/               # Next.js (데이터 수집, placeholder)
├── packages/
│   ├── typescript-config/             # 공유 tsconfig
│   ├── eslint-config/                 # 공유 ESLint
│   ├── supabase/                      # Supabase 클라이언트 + 타입
│   ├── effect-infra/                  # Effect.ts 인프라
│   ├── vitest-config/                 # Vitest 설정
│   └── ddd-content/                   # 콘텐츠 도메인 (BUILD)
├── supabase/                          # Supabase CLI workspace
│   ├── migrations/
│   └── config.toml
├── history/
│   ├── initial/                       # 초기 결정 (수정 금지)
│   ├── CURRENT/                       # 최신 상태
│   └── v0.1.0/                        # v0.1.0 기록
├── drizzle.config.ts                  # Drizzle Kit 설정
├── turbo.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

## Supabase

- `supabase/` — CLI workspace (migrations, seed, config)
- `packages/supabase/` — 앱에서 사용하는 클라이언트와 자동 생성 타입
- 타입 생성: `supabase gen types typescript` → `packages/supabase/src/types.ts`
- Drizzle schema: `packages/ddd-*/src/infrastructure/schema/` → `supabase/migrations/`
- 환경변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

## Git Strategy

- `main` — 프로덕션
- `dev` — 개발
- `feat/*`, `fix/*` — 작업 브랜치
