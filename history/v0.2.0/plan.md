# v0.2.0 Plan — Content Infrastructure + Homepage + Admin

> Date: 2026-02-23

## Goals

v0.1.0에서 수립한 DDD 인프라, Effect.ts 기반 백엔드, Drizzle ORM 스키마 위에 실제 동작하는 코드를 구현한다.

1. **ddd-content 리포지토리 어댑터 구현** — Drizzle + @effect/sql-drizzle 기반
2. **Layer 합성** — ContentLive 레이어 완성
3. **Supabase 서버 클라이언트 보완** — `await` 패턴 수정
4. **shadcn/ui 컴포넌트 추가** — 필수 UI 컴포넌트
5. **Homepage 구현** — 회사 소개 랜딩 + 블로그 목록/상세
6. **Admin 구현** — Supabase Auth (GitHub/Discord) + 블로그 CRUD + 정적 콘텐츠 관리
7. **테스트 작성** — 어댑터, 서비스, 매퍼 테스트
8. **history 업데이트**

## Architecture Decisions

### 데이터 접근 패턴

- **Effect + @effect/sql-drizzle**: ddd-content 리포지토리 어댑터 (서버 사이드 신뢰 구간)
- **Supabase Client (anon)**: Homepage 공개 읽기 (RLS가 published 포스트만 허용)
- **Supabase Client (auth session)**: Admin CRUD (RLS가 인증된 사용자 접근 제어)

### 인증

- Supabase Auth의 GitHub + Discord OAuth provider 사용
- Admin 앱에 로그인/콜백 구현
- Next.js middleware로 보호 라우트 구현

## Phase Breakdown

### Phase 1: Infrastructure

- [ ] ddd-content Drizzle 리포지토리 어댑터 구현
- [ ] ContentLive Layer 합성
- [ ] effect-infra 타입 에러 수정 (Config.redacted)

### Phase 2: UI Foundation

- [ ] shadcn/ui 컴포넌트 추가 (button, card, input, textarea, badge, separator, label, table, dialog, dropdown-menu, avatar, sonner, tabs)

### Phase 3: Homepage

- [ ] 랜딩 페이지 (회사 소개, 기술 스택, 연락처)
- [ ] 블로그 목록 페이지
- [ ] 블로그 상세 페이지

### Phase 4: Admin

- [ ] Supabase Auth (GitHub + Discord) 로그인
- [ ] Auth 콜백 라우트
- [ ] 미들웨어 (보호 라우트)
- [ ] 대시보드 레이아웃
- [ ] 블로그 포스트 CRUD (목록, 생성, 수정, 삭제)
- [ ] 정적 콘텐츠 관리

### Phase 5: Tests + Docs

- [ ] 리포지토리 어댑터 단위 테스트
- [ ] 매퍼 테스트
- [ ] history/CURRENT 업데이트
- [ ] execution-log.md 작성
