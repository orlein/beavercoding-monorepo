# v0.1.0 Execution Log

> Date: 2026-02-22

## Summary

초기 monorepo(v0.0.0) 위에 DDD + Effect.ts + Drizzle ORM 인프라 구축 및 5개 앱 scaffold 완료.

## Executed Steps

### Phase 1: Foundation
- [x] Skills 5개 설치 (effect-ts, drizzle-orm, postgres-drizzle, clean-ddd-hexagonal, pnpm)
- [x] CLAUDE.md 업데이트 (DDD, Effect, Drizzle 규칙 추가)
- [x] `history/v0.1.0/plan.md` 생성

### Phase 2: Shared Infrastructure
- [x] Root `package.json` — test, db:generate/migrate/push 스크립트 추가, drizzle-kit devDep
- [x] `turbo.json` — test pipeline 추가
- [x] `drizzle.config.ts` 생성 — schema glob, supabase/migrations output
- [x] `.gitignore` — coverage/ 추가
- [x] `packages/effect-infra` 생성 — PgClient layer, DrizzleLive, config, errors
- [x] `packages/vitest-config` 생성 — 공유 vitest 설정
- [x] `packages/eslint-config` — `library.js` export 추가

### Phase 3: Rename
- [x] `apps/web` → `apps/homepage` 이동
- [x] package name `@beavercoding/web` → `@beavercoding/homepage`
- [x] `@beavercoding/ddd-content` dep 추가
- [x] `next.config.ts` transpilePackages 업데이트
- [x] layout.tsx metadata 업데이트

### Phase 4: New Apps
- [x] `apps/admin` — port 3001, ddd-content dep
- [x] `apps/beaver-world` — port 3002, placeholder
- [x] `apps/beaver-pass` — port 3003, placeholder
- [x] `apps/beaver-reporter` — port 3004, placeholder

### Phase 5: DDD Content
- [x] Full DDD structure (domain/application/infrastructure)
- [x] Value Objects: ContentId, Slug, ContentBody, ContentStatus
- [x] Entities: BlogPost, StaticContent
- [x] Events: PostPublished, PostUpdated, ContentUpdated
- [x] Errors: ContentNotFoundError, SlugAlreadyExistsError
- [x] Application Services: getPublishedPosts, getPostBySlug, getStaticContent
- [x] DTOs + Mappers
- [x] Infrastructure Ports: BlogPostRepository, StaticContentRepository (Effect Context tags)
- [x] Drizzle Schema: blog_posts, static_contents with Supabase RLS policies
- [x] tsup build config (ESM+CJS+DTS)
- [x] Unit test: slug.test.ts (8 tests)

### Phase 6: Verification
- [x] `pnpm install` — no errors
- [x] `pnpm build` — 6/6 tasks successful (1 tsup + 5 Next.js)
- [x] `pnpm test` — 8/8 tests passed
- [x] `pnpm lint` — 7/7 packages clean

### Phase 7: Documentation
- [x] `history/CURRENT/architecture.md` 업데이트
- [x] `history/CURRENT/guidelines.md` 업데이트
- [x] `history/v0.1.0/execution-log.md` 생성

## Issues & Fixes

1. **Effect version mismatch**: 초기 version ranges가 호환되지 않음 → effect ^3.19, @effect/sql ^0.49, @effect/sql-drizzle ^0.48, drizzle-orm >=0.43.1 <0.50 으로 수정
2. **tsup DTS build error**: base tsconfig의 `incremental: true`가 tsup과 충돌 → ddd-content tsconfig에서 `incremental: false` override
3. **import type 오류**: services에서 Effect Context tags를 `import type`으로 가져옴 → value import로 수정
4. **Slug regex**: consecutive dashes 미처리 → `/-{2,}/g` 패턴 추가
5. **next-env.d.ts lint error**: Next.js 자동생성 파일의 triple-slash reference → ESLint ignores에 추가

## File Count

- Created: ~65 files
- Modified: ~8 files
- Moved: apps/web → apps/homepage
