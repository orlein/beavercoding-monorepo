# Architecture — Current State

> Last updated: 2026-02-23 (v0.2.0)

## Tech Stack

| Category | Choice |
|----------|--------|
| Package Manager | pnpm (workspace) |
| Build System | Turborepo |
| Framework | Next.js 15 (App Router) |
| Backend/DB | Supabase (Auth, Database, Storage) |
| ORM | Drizzle ORM (Supabase RLS) |
| Backend Logic | Effect.ts + @effect/sql-drizzle |
| Styling | Tailwind CSS v4 (CSS-first) |
| UI Components | shadcn/ui (new-york style, OKLCH) |
| Language | TypeScript (strict) |
| Testing | Vitest |
| DDD Build | tsup (ESM) |

## Package Strategy

- **JIT (Just-In-Time)**: config 패키지 — 빌드 없이 TS 소스 직접 export
- **BUILD**: `ddd-*` 패키지 — tsup으로 ESM 빌드, `dist/` 출력

## Active Packages

### Apps

| Package | Scope | 역할 | Port | 상태 |
|---------|-------|------|------|------|
| `apps/homepage` | `@beavercoding/homepage` | 홈페이지 + 블로그 | 3000 | 랜딩+블로그 구현 |
| `apps/admin` | `@beavercoding/admin` | 관리자 대시보드 | 3001 | 인증+블로그CRUD+콘텐츠 관리 |
| `apps/beaver-world` | `@beavercoding/beaver-world` | 커뮤니티 (placeholder) | 3002 | 스캐폴딩 |
| `apps/beaver-pass` | `@beavercoding/beaver-pass` | OAuth 인증모듈 (placeholder) | 3003 | 스캐폴딩 |
| `apps/beaver-reporter` | `@beavercoding/beaver-reporter` | 데이터 수집 (placeholder) | 3004 | 스캐폴딩 |

### Shared Packages

| Package | Scope | Pattern | 역할 |
|---------|-------|---------|------|
| `packages/typescript-config` | `@beavercoding/typescript-config` | JIT | 공유 tsconfig |
| `packages/eslint-config` | `@beavercoding/eslint-config` | JIT | 공유 ESLint (base, next, library) |
| `packages/supabase` | `@beavercoding/supabase` | JIT | Supabase 클라이언트, 타입, 미들웨어 |
| `packages/effect-infra` | `@beavercoding/effect-infra` | JIT | Effect.ts 공유 인프라 (DB, config, errors) |
| `packages/vitest-config` | `@beavercoding/vitest-config` | JIT | Vitest 공유 설정 |
| `packages/ui` | `@beavercoding/ui` | JIT | 공유 UI 컴포넌트 (Tailwind v4 + shadcn/ui) |

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
        ├── adapters/outbound/ # Drizzle 구현체 (v0.2.0 구현 완료)
        ├── schema/            # Drizzle 테이블 + Supabase RLS policies
        └── layer.ts           # Effect Layer composition (ContentLive)
```

## Data Access Patterns

### Effect + @effect/sql-drizzle (서버 사이드)
- ddd-content 리포지토리 어댑터가 Drizzle 테이블 쿼리
- `SqlError` → `Effect.orDie` (인프라 에러는 defect)
- `ContentNotFoundError` → 도메인 에러
- `ContentLive` Layer = `BlogPostRepositoryLive` + `StaticContentRepositoryLive` + `DrizzleLayer`

### Supabase Client (앱)
- Homepage: anon key로 공개 읽기 (RLS가 published만 허용)
- Admin: auth session으로 CRUD (RLS가 인증된 사용자 접근 제어)
- Server Actions에서 `createServerClient()` 사용

## Authentication

- Supabase Auth의 GitHub + Discord OAuth
- Admin 앱: 로그인 → OAuth → 콜백 → 세션 설정
- Middleware: 보호 라우트 (로그인/콜백 제외)
- Dashboard layout: 서버 컴포넌트에서 user 확인, 미인증 시 리다이렉트

## Directory Structure

```
beavercoding-monorepo/
├── apps/
│   ├── homepage/                      # Next.js (홈페이지 + 블로그)
│   │   └── src/app/
│   │       ├── page.tsx               # 랜딩
│   │       └── blog/
│   │           ├── page.tsx           # 블로그 목록
│   │           └── [slug]/page.tsx    # 블로그 상세
│   ├── admin/                         # Next.js (관리자)
│   │   └── src/
│   │       ├── middleware.ts          # Auth 가드
│   │       └── app/
│   │           ├── login/page.tsx     # 로그인
│   │           ├── auth/callback/     # OAuth 콜백
│   │           └── (dashboard)/       # 보호 라우트 그룹
│   │               ├── page.tsx       # 대시보드
│   │               ├── blog/          # 블로그 CRUD
│   │               └── content/       # 정적 콘텐츠 관리
│   ├── beaver-world/                  # placeholder
│   ├── beaver-pass/                   # placeholder
│   └── beaver-reporter/               # placeholder
├── packages/
│   ├── typescript-config/             # 공유 tsconfig
│   ├── eslint-config/                 # 공유 ESLint
│   ├── supabase/                      # Supabase 클라이언트 + 타입
│   ├── effect-infra/                  # Effect.ts 인프라
│   ├── vitest-config/                 # Vitest 설정
│   ├── ui/                            # 공유 UI (13개 shadcn 컴포넌트)
│   └── ddd-content/                   # 콘텐츠 도메인 (BUILD)
├── supabase/                          # Supabase CLI workspace
├── history/
│   ├── initial/                       # 초기 결정 (수정 금지)
│   ├── CURRENT/                       # 최신 상태
│   ├── v0.1.0/                        # v0.1.0 기록
│   └── v0.2.0/                        # v0.2.0 기록
├── drizzle.config.ts
├── turbo.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

## Supabase

- `supabase/` — CLI workspace (migrations, seed, config)
- `packages/supabase/` — 앱에서 사용하는 클라이언트와 타입
  - `client.ts` — 브라우저 클라이언트
  - `server.ts` — 서버 클라이언트 (cookies 기반)
  - `middleware.ts` — Next.js 미들웨어 세션 갱신
  - `types.ts` — 수동 유지 Database 타입 (나중에 `pnpm run generate`로 자동 생성)
- Drizzle schema: `packages/ddd-*/src/infrastructure/schema/` → `supabase/migrations/`
- 환경변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

## Styling (Tailwind CSS v4 + shadcn/ui)

- **Tailwind CSS v4**: CSS-first 설정, `tailwind.config.js` 불필요
- **PostCSS**: `@tailwindcss/postcss` 플러그인
- **shadcn/ui**: `new-york` 스타일, OKLCH 색상 체계
- **공유 패키지**: `packages/ui/` — 테마, 13개 컴포넌트, 유틸리티
- **사용 가능 컴포넌트**: button, card, input, textarea, badge, separator, label, table, dialog, dropdown-menu, avatar, tabs, sonner, select
- **앱 CSS**: 각 앱의 `src/app/globals.css` → `@import "@beavercoding/ui/globals.css"`
- **Import**: `import { Button } from "@beavercoding/ui/components/button"`

## Git Strategy

- `main` — 프로덕션
- `dev` — 개발
- `feat/*`, `fix/*` — 작업 브랜치
