# Project Overview

## BeaverCoding Monorepo

- **Date**: 2026-02-22
- **Status**: Initial Setup

## Goal

pnpm + Turborepo 기반 모노레포 프로젝트를 구축한다.
Next.js를 프론트엔드 프레임워크로, Supabase를 백엔드(Auth, DB, Storage)로 사용한다.

## Tech Stack Decision

| Category       | Choice     | Reason                                    |
| -------------- | ---------- | ----------------------------------------- |
| Package Manager | pnpm      | 디스크 효율, strict dependency resolution  |
| Build System   | Turborepo  | 캐싱, 병렬 빌드, pnpm workspace 네이티브 지원 |
| Framework      | Next.js    | App Router, SSR/SSG, Vercel 배포 용이      |
| Backend        | Supabase   | PostgreSQL, Auth, Realtime, Storage 통합   |
| Language       | TypeScript | 타입 안전성, 모노레포 내 공유 타입 관리       |
