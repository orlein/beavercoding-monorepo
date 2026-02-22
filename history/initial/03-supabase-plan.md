# Supabase Integration Plan

## Supabase Features to Use

### 1. Authentication
- Supabase Auth (email/password, OAuth providers)
- Next.js 미들웨어에서 세션 관리
- `@supabase/ssr` 패키지 사용

### 2. Database
- PostgreSQL (Supabase hosted)
- Row Level Security (RLS) 적용
- 타입 자동 생성: `supabase gen types typescript`

### 3. Storage
- 파일 업로드/관리
- RLS 기반 접근 제어

### 4. Realtime (필요시)
- 실시간 데이터 구독

## Shared Package: `@beavercoding/supabase`

```
packages/supabase/
├── src/
│   ├── client.ts        # 브라우저용 클라이언트
│   ├── server.ts        # 서버용 클라이언트
│   ├── middleware.ts     # Next.js 미들웨어 헬퍼
│   └── types.ts         # 자동 생성된 DB 타입 (re-export)
├── package.json
└── tsconfig.json
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=       # 서버 전용, 절대 클라이언트에 노출 금지
```
