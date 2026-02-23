# v0.2.0 Execution Log

> Date: 2026-02-23

## Summary

v0.1.0 스캐폴딩 위에 실제 동작하는 코드를 구현했다. ddd-content 리포지토리 어댑터, Homepage 랜딩+블로그, Admin 대시보드+블로그 CRUD+정적 콘텐츠 관리를 완성했다.

## Phase 1: Infrastructure

### effect-infra 타입 에러 수정
- `Config.string("DATABASE_URL")` → `Config.redacted("DATABASE_URL")` (`PgClientConfig.url`이 `Redacted<string>`을 기대)
- `PgTest` 헬퍼에서 `Config.succeed(url)` → `Config.succeed(Redacted.make(url))`
- import 정렬 수정 (biome 경고 해소)

### ddd-content 리포지토리 어댑터
- `BlogPostRepositoryLive`: `@effect/sql-drizzle/Pg`의 `PgDrizzle`을 사용해 `blogPosts` 테이블 쿼리
- `StaticContentRepositoryLive`: 동일 패턴으로 `staticContents` 테이블 쿼리
- `SqlError` → `Effect.orDie`로 defect 처리 (인프라 에러는 도메인 에러가 아님)
- `ContentLive` Layer: `BlogPostRepositoryLive` + `StaticContentRepositoryLive` → `DrizzleLayer` 합성
- tsup externals에 `@effect/sql` 추가, 의존성 추가

### Supabase 서버 클라이언트 보완
- `server.ts`: `setAll`에서 Server Component 호출 시 발생하는 에러를 `try/catch`로 처리
- `middleware.ts`: `supabase.auth.getUser()`에 `await` 추가
- `types.ts`: `blog_posts`, `static_contents` 테이블의 수동 Database 타입 작성

## Phase 2: UI Foundation

### shadcn/ui 컴포넌트 추가 (13개)
- button, card, input, textarea, badge, separator, label, table, dialog, dropdown-menu, avatar, tabs, sonner
- select 컴포넌트 수동 추가 (admin 폼용)
- `packages/ui/package.json` exports에 `types` 조건 추가 (TypeScript 해석 수정)

## Phase 3: Homepage

### 랜딩 페이지
- Hero: 회사명, 태그라인, Blog/Contact CTA
- Features: 4개 카드 (React Native, Next.js, Node.js, Knowledge Monetization)
- Contact: `hello@beavercoding.dev` 이메일 링크
- Inter 폰트, 스티키 헤더, 푸터

### 블로그
- `/blog`: `blog_posts` 테이블에서 published 포스트 목록 (Supabase client)
- `/blog/[slug]`: 슬러그 기반 포스트 상세, `notFound()` 처리
- Supabase 미연결 시 빈 목록 graceful fallback

## Phase 4: Admin

### 인증
- Login 페이지: GitHub + Discord OAuth (Supabase Auth)
- Auth callback 라우트: 코드 → 세션 교환
- Middleware: 보호 라우트 (로그인/콜백 제외), 미인증 시 `/login` 리다이렉트

### 대시보드 레이아웃
- 사이드바: 네비게이션 (Dashboard, Blog Posts, Static Content), 사용자 정보, 로그아웃
- (dashboard) 라우트 그룹으로 레이아웃 공유

### 블로그 CRUD
- 목록: 테이블 (제목, 슬러그, 상태, 작성일, 수정일, 작업)
- 생성: 제목/본문/상태 폼, 슬러그 자동 생성
- 수정: ID 기반 조회, 프리필 폼
- 삭제: 확인 다이얼로그 후 삭제
- Server Actions: `createPost`, `updatePost`, `deletePost`

### 정적 콘텐츠 관리
- 목록: 인라인 편집 (ContentEditor)
- 생성: AddContentForm
- 삭제: 확인 다이얼로그
- Server Actions: `upsertContent`, `deleteContent`

## Phase 5: Tests

### 새 테스트
- `mappers.test.ts` (9개): toBlogPostDto, toStaticContentDto 매핑 검증
- `blog-post-repository-drizzle.test.ts` (5개): 모크 기반 리포지토리 인터페이스 계약 테스트

### 기존 테스트
- `slug.test.ts` (8개): 변경 없이 통과

### 결과
- **22개 테스트 전체 통과**
- ddd-content 빌드 성공 (ESM + DTS)

## Issues & Fixes

1. **shadcn CLI가 잘못된 경로에 컴포넌트 생성**: `packages/ui/@beavercoding/ui/components/` → `packages/ui/src/components/`로 수동 이동 후 잘못된 디렉토리 삭제
2. **tsup DTS 빌드 실패 (SqlError 타입 불일치)**: 어댑터에서 `Effect.orDie`로 SqlError를 defect 처리, `@effect/sql` 의존성 + external 추가
3. **Homepage 블로그가 잘못된 테이블명 사용**: `posts` → `blog_posts`, 컬럼명도 Drizzle 스키마에 맞게 수정
