# Package Management Decision

- **Date**: 2026-02-22
- **Status**: Decided

## Decision: Internal Packages (JIT) 패턴 채택

빌드 스텝 없이 TypeScript 소스를 직접 export하고,
소비하는 앱(Next.js)의 번들러가 트랜스파일하는 방식.

### 선택 이유

| 항목 | Internal (JIT) | Compiled |
|------|----------------|----------|
| 설정 복잡도 | 낮음 | 높음 |
| 빌드 스텝 | 불필요 | 필요 (tsc) |
| Turborepo 캐싱 | 앱 레벨만 | 패키지 레벨도 가능 |
| 적합한 시점 | 프로젝트 초기, 단일 번들러 | 다양한 소비자, 대규모 팀 |

**결론**: 프로젝트 초기에는 JIT 패턴이 적합. 추후 필요시 Compiled로 전환.

## Package 구성

### 즉시 생성

| Package | Scope Name | 역할 |
|---------|-----------|------|
| `packages/typescript-config` | `@beavercoding/typescript-config` | 공유 tsconfig (base, nextjs, library) |
| `packages/eslint-config` | `@beavercoding/eslint-config` | 공유 ESLint 룰 |
| `packages/supabase` | `@beavercoding/supabase` | Supabase 클라이언트, 자동 생성 타입, 헬퍼 |

### 필요 시 생성

| Package | 조건 |
|---------|------|
| `packages/ui` | 두 번째 앱이 추가되어 UI 공유가 필요할 때 |
| `packages/<domain>-utils` | 3개 이상 위치에서 동일 로직 중복 시 (도메인별 이름 사용) |

### 만들지 않음

| Package | 이유 |
|---------|------|
| `packages/utils` | "잡동사니 서랍" 안티패턴. 의존성 추적 어려움, SRP 위반 |
| `packages/config` (통합) | ESLint와 TypeScript 설정은 분리하는 것이 관리 용이 |

## Internal Package 설정 방법

각 패키지의 `package.json`에서 소스를 직접 export:

```json
{
  "name": "@beavercoding/supabase",
  "exports": {
    ".": "./src/index.ts",
    "./client": "./src/client.ts",
    "./server": "./src/server.ts"
  }
}
```

- 빌드 스텝 없음
- 소비 앱(Next.js)의 `next.config.ts`에서 `transpilePackages` 설정
- TypeScript는 `tsconfig.json`의 project references 또는 paths로 해결

## Supabase Workspace

`supabase/` 디렉토리를 별도 워크스페이스로 관리:

```
supabase/
├── package.json          # scripts: start, reset, push, generate
├── config.toml
├── migrations/
└── seed.sql
```

타입 자동 생성 파이프라인:

```json
// turbo.json
{
  "tasks": {
    "@beavercoding/supabase#generate": {
      "outputs": ["src/types.ts"]
    }
  }
}
```

## 최종 디렉토리 구조

```
beavercoding-monorepo/
├── apps/
│   └── web/                           # Next.js App Router
│       ├── app/
│       ├── components/                # 앱 전용 UI (초기에는 여기에 colocate)
│       └── package.json
│
├── packages/
│   ├── typescript-config/             # 공유 tsconfig
│   ├── eslint-config/                 # 공유 ESLint
│   └── supabase/                      # Supabase 클라이언트 + 타입
│
├── supabase/                          # Supabase CLI workspace (migrations, seed)
│
├── turbo.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── package.json
├── CLAUDE.md
└── history/
```
