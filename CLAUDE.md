# BeaverCoding Monorepo

pnpm + Turborepo + Next.js (App Router) + Supabase + TypeScript (strict)
Effect.ts (backend) + Drizzle ORM (Supabase RLS) + DDD (Hexagonal Architecture)
Tailwind CSS v4 + shadcn/ui (styling)

## Structure

```
apps/homepage/                 # 홈페이지 + 블로그
apps/admin/                    # 관리자 대시보드
apps/beaver-world/             # 커뮤니티 (placeholder)
apps/beaver-pass/              # OAuth 인증모듈 (placeholder)
apps/beaver-reporter/          # 데이터 수집 (placeholder)
packages/typescript-config/    # 공유 tsconfig (JIT)
packages/eslint-config/        # 공유 ESLint (JIT)
packages/supabase/             # Supabase 클라이언트 + 자동 생성 타입 (JIT)
packages/effect-infra/         # Effect.ts 공유 인프라 (JIT)
packages/vitest-config/        # Vitest 공유 설정 (JIT)
packages/ui/                   # 공유 UI 컴포넌트 — Tailwind CSS v4 + shadcn/ui (JIT)
packages/ddd-content/          # 콘텐츠 도메인 (BUILD — tsup)
supabase/                      # Supabase CLI (migrations, seed)
```

## Rules

1. ALWAYS use `karpathy-guidelines` skill
2. React 코드 → `vercel-react-best-practices` skill
3. Effect.ts 코드 → `effect-ts` skill
4. Drizzle ORM 코드 → `drizzle-orm`, `postgres-drizzle` skills
5. DDD/Hexagonal 구조 → `clean-ddd-hexagonal` skill
6. 공유 로직 `packages/`, 앱 전용 `apps/`
7. Supabase 타입/클라이언트 → `@beavercoding/supabase`
8. 제네릭 `utils` 패키지 금지 — 도메인별 분리
9. 결정 변경 시 `history/CURRENT/` 업데이트
10. 스타일링은 반드시 Tailwind CSS v4 + shadcn/ui 최신 버전 사용
11. UI 컴포넌트 → `@beavercoding/ui` 공유 패키지에 배치
12. shadcn/ui 컴포넌트 추가: `npx shadcn@latest add <component>` (packages/ui 디렉토리에서 실행)

## Package Patterns

- **JIT (Just-In-Time)**: config 패키지 — 빌드 없이 TS 소스 직접 export
- **BUILD**: `ddd-*` 패키지 — tsup으로 ESM+CJS 빌드, `dist/` 출력

## DDD Conventions

- Bounded Context → `packages/ddd-<context>/`
- 구조: `domain/` (entities, value-objects, events, errors) → `application/` (services, dtos, mappers) → `infrastructure/` (ports, adapters, schema, layer)
- Domain layer는 순수 함수 + Effect types만 사용 (외부 의존성 금지)
- Infrastructure ports: inbound (use case interfaces), outbound (repository interfaces as Effect Context tags)
- Drizzle schema: `infrastructure/schema/` — `pgTable` + `pgPolicy` with Supabase RLS
- Effect Layer composition: `infrastructure/layer.ts`

## Styling Conventions (Tailwind CSS v4 + shadcn/ui)

- Tailwind CSS v4 — CSS-first 설정 (`@import "tailwindcss"`, `tailwind.config.js` 없음)
- PostCSS 플러그인: `@tailwindcss/postcss`
- shadcn/ui — `new-york` 스타일, OKLCH 색상, `tw-animate-css` 애니메이션
- 공유 UI 패키지: `packages/ui/` — 모든 shadcn 컴포넌트와 테마 정의
- 테마 변수: `packages/ui/src/styles/globals.css` — `@theme inline` 디렉티브
- 각 앱 CSS: `src/app/globals.css` → `@import "@beavercoding/ui/globals.css"`
- 컴포넌트 import: `import { Button } from "@beavercoding/ui/components/button"`
- `cn()` 유틸: `import { cn } from "@beavercoding/ui/lib/utils"`
- 컴포넌트 추가 CLI: `npx shadcn@latest add <component>` (packages/ui 디렉토리에서)

## Effect.ts Conventions

- Backend 로직은 Effect.ts만 사용
- `@effect/sql-drizzle` + `@effect/sql-pg` for DB access
- Effect services as Context tags, composed via Layers
- Error handling: TaggedError hierarchy

## Project Management

- semver 버저닝, 계획은 `history/v<version>/plan.md`
- 수행 내용은 `history/v<version>/` 에 기록
- 버전 변경 시 `history/CURRENT/` 업데이트

## History

- `history/initial/` — 초기 결정 (수정 금지)
- `history/CURRENT/` — 최신 컨텍스트 (architecture.md, guidelines.md)
- `history/v<version>/` — 버전별 계획 + 실행 기록
