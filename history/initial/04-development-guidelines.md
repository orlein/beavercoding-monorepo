# Development Guidelines

## Code Conventions

1. **TypeScript strict mode** — 모든 패키지에 strict 활성화
2. **ESLint + Prettier** — 공유 설정을 `@beavercoding/config`에서 관리
3. **Import alias** — `@/` 접두사로 앱 내부 import

## Turborepo Pipeline

```jsonc
// turbo.json
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
    }
  }
}
```

## Git Strategy

- `main` — 프로덕션 브랜치
- `dev` — 개발 브랜치
- Feature branches: `feat/feature-name`
- Fix branches: `fix/bug-name`

## Claude Code Usage Rules

1. **karpathy-guidelines** 스킬을 항상 적용
2. React 코드 작성 시 **vercel-react-best-practices** 스킬 적용
3. 기존 파일 수정 우선, 새 파일 생성은 최소화
4. 공유 로직은 `packages/`, 앱 전용 로직은 `apps/`에 배치
5. Supabase 타입/클라이언트는 `@beavercoding/supabase` 패키지에서 관리
