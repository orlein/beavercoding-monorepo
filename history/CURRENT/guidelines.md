# Development Guidelines — Current State

> Last updated: 2026-02-22

## Code Conventions

- TypeScript strict mode 전체 적용
- ESLint + Prettier — `@beavercoding/eslint-config`에서 관리
- Import alias: `@/` (앱 내부)

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

## Claude Code Rules

1. `karpathy-guidelines` 스킬 항상 적용
2. React 코드 → `vercel-react-best-practices` 스킬 적용
3. 기존 파일 수정 우선, 새 파일 최소화
4. 공유 로직은 `packages/`, 앱 전용은 `apps/`
5. Supabase 타입/클라이언트는 `@beavercoding/supabase`에서 관리
6. 제네릭 `utils` 패키지 금지 — 도메인별 패키지로 분리
