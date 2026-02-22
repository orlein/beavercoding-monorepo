# Monorepo Structure

## Directory Layout

```
beavercoding-monorepo/
├── apps/
│   └── web/                  # Next.js 메인 웹 애플리케이션
│       ├── app/              # App Router (pages, layouts)
│       ├── public/
│       └── package.json
│
├── packages/
│   ├── ui/                   # 공유 UI 컴포넌트 라이브러리
│   ├── config/               # 공유 설정 (ESLint, TypeScript, Tailwind 등)
│   ├── supabase/             # Supabase 클라이언트, 타입, 헬퍼
│   └── utils/                # 공통 유틸리티 함수
│
├── turbo.json                # Turborepo 파이프라인
├── pnpm-workspace.yaml       # pnpm 워크스페이스 정의
├── package.json              # 루트 패키지 (scripts, devDependencies)
├── .gitignore
├── CLAUDE.md                 # Claude Code 지침
└── history/                  # 프로젝트 히스토리 기록
    └── initial/
```

## Workspace Configuration

### pnpm-workspace.yaml

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

## Package Naming Convention

- `@beavercoding/web` — 메인 웹 앱
- `@beavercoding/ui` — 공유 UI 컴포넌트
- `@beavercoding/config` — 공유 설정
- `@beavercoding/supabase` — Supabase 클라이언트/타입
- `@beavercoding/utils` — 공통 유틸리티
