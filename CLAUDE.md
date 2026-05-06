# support_campaign_newbiz

소상공인 지원사업 자동매칭 웹 서비스 — 아이샵케어 아이디어톤 2026-04-30 프로토타입

## 프로젝트 경로
- 메인 파일: `/Users/ishopcare/ideathon-grant-notify/index.html`
- 공고 데이터: `/Users/ishopcare/ideathon-grant-notify/data/grants.js`
- 지역 데이터: `/Users/ishopcare/ideathon-grant-notify/data/regions.js`

## 개발 환경
- 서버 불필요 — 브라우저에서 `index.html` 직접 오픈
- 스택: 순수 HTML + TDS CSS Custom Properties + Pretendard CDN

## 화면 플로우
```
#home → #step-type → #step-region → #step-industry
                                  ↓ existing → #step-revenue → #results → #detail
                                  ↓ prospective → #step-stage → #results → #detail
```

## 핵심 기능

### 1. 다단계 퍼널 필터
- 운영중/예비 사장님 구분 → 지역(시/도·시군구) → 업종 → 매출/창업단계
- `state` 객체에 모든 선택값 관리
- `findExistingGrants()` / `findProspectiveGrants()` 로 큐레이션 공고 필터

### 2. 카테고리 필터 칩
결과 화면 상단 가로 스크롤 칩:
`전체 | 자금지원 | 경영개선 | 창업 | 인건비 | 디지털 | 판로지원`
- 큐레이션 공고 + 기업마당 실시간 공고 동시 필터

### 3. 기업마당 실시간 API 연동
- **API**: `api.odcloud.kr/api/3034791/v1/uddi:80a74cfd-55d2-4dd3-81c7-d01567d0b3c4`
- **인증**: encoding key (API_KEY 상수에 하드코딩)
- **Swagger**: `https://infuser.odcloud.kr/oas/docs?namespace=3034791/v1`
- **CORS**: `Access-Control-Allow-Origin: *` → 브라우저 직접 호출 가능
- 소상공인 키워드 100건 fetch → 시/도 기준 클라이언트 필터 → **마감일 기준 진행중 공고만** 표시
- 결과: 큐레이션 아래 "기업마당 연동 · N건" 섹션으로 노출

### 4. 공고 상세 → 직접 링크
- 큐레이션 공고: `openDetail(id)` → 풍부한 상세 + tip 박스
- 기업마당 공고: `openLiveDetail(idx)` → 기본 정보 + `상세URL` 직접 연결
- `상세URL` 형식: `bizinfo.go.kr/web/lay1/bbs/S1T122C128/AS/74/view.do?pblancId=PBLN_...` (200 확인)

### 5. 예비 사장님 프로모 배너
- 예비 사장님 결과 화면 최상단에 아이샵케어 홈(`ishopcare.co.kr`) 배너
- 매출확인서 자동 발급 USP 노출

## API 키
- data.go.kr 데이터셋: [3034791](https://www.data.go.kr/data/3034791/fileData.do)
- encoding key: `0Op%2Bu9vJc1fyIyyvjRlNtjfbur037PNL119tdrlr2nwn8cuko4rk1qASLeuuVzXpPGxCF9Qe1GpI2bAk4dmiPA%3D%3D`
- decoding key: `0Op+u9vJc1fyIyyvjRlNtjfbur037PNL119tdrlr2nwn8cuko4rk1qASLeuuVzXpPGxCF9Qe1GpI2bAk4dmiPA==`
- 데이터 기준: 2024-03-31 스냅샷 (2025 스냅샷은 API 등록 대기 중)

## 큐레이션 공고 구조 (grants.js)
```js
{
  id, title, org, amount, rate, deadline, start,
  summary, detail, target, how_to_apply, tip,
  franchiseEligible, maxRevenueTier,   // 기존 사장님용
  stageRange,                          // 예비 사장님용 [min, max]
  regions, industries,
  apply_url,   // bizinfo.go.kr 검색 URL
  category,    // 자금지원|환경개선|인건비|긴급자금|디지털|창업교육|창업자금|임차지원|컨설팅
  color,       // blue|green|orange|red
}
```

## 마감일 필터 로직
```js
function isActive(dateStr) {
  return new Date(dateStr) >= new Date(new Date().toDateString());
}
```
- 큐레이션: `renderCuratedList()`에서 `isActive(g.deadline)` 선적용
- 기업마당: fetch 직후 `isActive(item["신청종료일자"])` 필터

## 지역 데이터 (regions.js)
- `SIDO_LIST`: 17개 시/도
- `SIGUNGU_MAP`: 시/도별 시/군/구 전체 목록

## 향후 개선 포인트
- data.go.kr 2025 스냅샷 활성화되면 `uddi:fa09d13d-bce8-474e-b214-8008e79ec08f` 로 교체
- sbiz24.kr POST API (`/api/combinePbanc/list`) 연동 시 더 풍부한 필터 가능 (인력수·매출액 필터 지원)
- Bun 백엔드 + 스케줄러로 bizinfo 스크래핑 자동화 → 실시간 큐레이션 공고 갱신
- TossPlace POS SDK 연동 버전: `~/ideathon-prototype/plugin/src/index.ts`
