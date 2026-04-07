# 송금 세일즈 계층형 어드민 (Frontend Mock)

Next.js App Router + TypeScript + Tailwind + shadcn/ui 스타일 컴포넌트 기반의 프론트엔드 샘플입니다.

## 실행

```bash
npm install
npm run dev
```

## 메뉴 구조

- 대시보드
- 조직 관리 (트리 + 상세)
- 세일즈 코드 관리
- 이벤트 코드 관리
- 성과 분석
- 전환 퍼널 분석
- 이벤트 타겟 고객 관리
- 메시지 발송 관리
- 관리자 권한 설정
- 감사 로그

## 아키텍처

- `app/(admin)` : App Router 페이지
- `components` : 재사용 UI/차트/테이블/트리 컴포넌트
- `lib/types` : 도메인/API 타입
- `lib/services` : 추후 API 교체 가능한 목 서비스 레이어
- `lib/mock` : 로컬 목 데이터
