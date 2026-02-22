# BeaverCoding Monorepo

pnpm + Turborepo + Next.js (App Router) + Supabase + TypeScript (strict)
Internal Packages (JIT) 패턴 — 빌드 없이 TS 소스 직접 export

## Structure

```
apps/web/                      # Next.js 메인 앱
packages/typescript-config/    # 공유 tsconfig
packages/eslint-config/        # 공유 ESLint
packages/supabase/             # Supabase 클라이언트 + 자동 생성 타입
supabase/                      # Supabase CLI (migrations, seed)
```

## Rules

1. ALWAYS use `karpathy-guidelines` skill
2. React 코드 → `vercel-react-best-practices` skill
3. 공유 로직 `packages/`, 앱 전용 `apps/`
4. Supabase 타입/클라이언트 → `@beavercoding/supabase`
5. 제네릭 `utils` 패키지 금지 — 도메인별 분리
6. 결정 변경 시 `history/CURRENT/` 업데이트

## History

- `history/initial/` — 초기 결정 (수정 금지)
- `history/CURRENT/` — 최신 컨텍스트 (architecture.md, guidelines.md)
