/**
 * 공고 데이터 & 필터링 로직
 * apply_url: 기업마당(bizinfo.go.kr) 키워드 검색 — 로그인 불필요, 200 확인됨
 */

const SEMAS_LOAN    = "https://ols.semas.or.kr";
const SEMAS_MKT     = "https://www.semas.or.kr/web/SUP01/SUP0107.kmdc";
const SEMAS_ENV     = "https://www.semas.or.kr/web/SUP01/SUP0108.kmdc";
const SEMAS_NEWBIZ  = "https://www.semas.or.kr/web/SUP01/SUP0101/SUP010112.kmdc";
const SEMAS_CNSLT   = "https://www.semas.or.kr/web/SUP01/SUP0102/SUP010201.kmdc";
const WORK24        = "https://www.work24.go.kr/cm/main.do?topArea=EBM00";
const SGF           = "https://www.seoulshinbo.co.kr";
const SBIZ24        = "https://www.sbiz24.kr/#/combinePbancList";

// ── 기존 사장님 공고 ──────────────────────────────
const EXISTING_GRANTS = [
  {
    id: "e001",
    title: "소상공인 경영개선자금",
    org: "소상공인시장진흥공단",
    amount: "최대 2,000만원",
    rate: "연 2.5%",
    deadline: "2026-05-12",
    start: "2026-05-01",
    summary: "매출 감소·임차료 부담 등 경영난을 겪는 소상공인에게 저금리 운영자금을 지원해요",
    detail: "매출 감소, 임차료 부담 등 경영위기를 겪는 소상공인에게 최대 2,000만원까지 연 2.5% 저금리로 운전자금을 지원합니다. 보증기관 연계 없이 소상공인진흥공단에서 직접 심사합니다.",
    target: "사업자등록 6개월 이상, 연 매출 10억 이하 소상공인 (음식점·소매·미용 등 가게 운영자)",
    how_to_apply: "소상공인시장진흥공단 홈페이지 정책자금 신청 페이지에서 온라인 접수 또는 가까운 소상공인지원센터 방문",
    tip: "<b>소상공인시장진흥공단 정책자금 신청 페이지</b>로 이어져요. 사업자등록번호로 회원가입이 되어 있으면 기본 정보가 자동으로 채워져요. 공동인증서(구 공인인증서)가 필요하니 미리 준비해두세요.",
    franchiseEligible: false,
    maxRevenueTier: 2,
    regions: ["전국"],
    industries: ["전체"],
    apply_url: SEMAS_LOAN,
    category: "자금지원",
    color: "blue",
  },
  {
    id: "e002",
    title: "전통시장·상점가 환경개선 지원",
    org: "소상공인시장진흥공단",
    amount: "최대 500만원",
    rate: null,
    deadline: "2026-05-19",
    start: "2026-05-05",
    summary: "전통시장·등록 상점가 내 가게 사장님에게 간판·인테리어 개선비를 보조해요",
    detail: "전통시장 및 등록 상점가 내 사업자 대상으로 간판 교체, 매장 내부 인테리어, 위생설비 개선 비용을 최대 500만원까지 보조합니다. 임대차계약서로 시장 내 위치를 확인합니다.",
    target: "전통시장 또는 등록 상점가에 입점한 소상공인 (임대차 계약서 필요)",
    how_to_apply: "소상공인시장진흥공단 홈페이지 전통시장·상점가 환경개선 신청 페이지에서 온라인 접수 또는 시·군·구 담당부서 방문",
    tip: "<b>소상공인시장진흥공단 시장환경개선 신청 페이지</b>로 이어져요. 온라인 신청보다 관할 시·군·구청 소상공인 담당 부서에 먼저 전화하는 게 빠를 때가 많아요. 지역마다 접수 방식이 달라서, 담당자한테 직접 물어보면 훨씬 수월하게 진행돼요.",
    franchiseEligible: true,
    maxRevenueTier: 3,
    regions: ["전국"],
    industries: ["전체"],
    apply_url: SEMAS_MKT,
    category: "환경개선",
    color: "green",
  },
  {
    id: "e003",
    title: "소상공인 고용장려금",
    org: "고용노동부",
    amount: "월 최대 80만원",
    rate: null,
    deadline: "2026-05-26",
    start: "2026-05-05",
    summary: "직원을 고용 중인 소상공인 사장님에게 인건비 일부를 최장 12개월 지원해요",
    detail: "1인 이상 근로자를 고용하고 고용보험에 가입한 소상공인 대상으로 직원 1인당 월 최대 80만원을 최장 12개월간 지원합니다. 음식점, 소매업, 미용업 등 업종 제한 없이 신청 가능합니다.",
    target: "고용보험 가입 근로자 1인 이상 고용 중인 소상공인 사업주",
    how_to_apply: "고용24(work24.go.kr) 홈페이지에서 온라인 신청 또는 관할 고용센터 방문",
    tip: "<b>고용24(work24.go.kr)</b>로 이어져요. 공동인증서로 로그인하면 직원 고용보험 가입 내역이 자동으로 조회돼서 별도 서류 없이 신청 가능해요. 가입 후 신청하지 않으면 소급 적용이 안 되니 타이밍을 놓치지 마세요.",
    franchiseEligible: true,
    maxRevenueTier: 3,
    regions: ["전국"],
    industries: ["전체"],
    apply_url: WORK24,
    category: "인건비",
    color: "orange",
  },
  {
    id: "e004",
    title: "서울 소상공인 매출회복 긴급자금",
    org: "서울신용보증재단",
    amount: "최대 1,000만원",
    rate: "연 1.5%",
    deadline: "2026-05-15",
    start: "2026-05-01",
    summary: "매출이 줄어든 서울 소재 가게 사장님에게 초저금리 긴급 운영자금을 지원해요",
    detail: "전년 동기 대비 매출이 20% 이상 감소한 서울 소재 소상공인에게 최대 1,000만원을 연 1.5% 초저금리로 지원합니다. 서울신용보증재단에서 보증 연계로 빠르게 처리됩니다.",
    target: "서울 소재 소상공인, 전년 동기 대비 매출 20% 이상 감소한 가게 운영자",
    how_to_apply: "서울신용보증재단(seoulshinbo.co.kr) 홈페이지에서 소상공인 긴급자금 공고 확인 및 온라인 신청",
    tip: "매출 감소 입증 서류(전년도·당해 부가세 신고서 또는 카드매출 내역)를 미리 준비해두면 신청이 훨씬 빨라요. <b>마감이 임박</b>한 공고라 서두르는 게 좋아요.",
    franchiseEligible: false,
    maxRevenueTier: 2,
    regions: ["서울"],
    industries: ["전체"],
    apply_url: SGF,
    category: "긴급자금",
    color: "red",
  },
  {
    id: "e005",
    title: "소상공인 사업장 환경개선 지원",
    org: "소상공인시장진흥공단",
    amount: "최대 300만원",
    rate: null,
    deadline: "2026-06-02",
    start: "2026-05-10",
    summary: "오래된 가게 인테리어·위생시설 개선 공사비를 지원해요",
    detail: "영업장 내부 인테리어, 안전시설, 위생설비 개선 공사비를 최대 300만원까지 보조합니다. 사업 개시 1년 이상 경과한 소상공인이 대상이며 견적서 제출 후 심사합니다.",
    target: "사업 개시 1년 이상 경과한 소상공인 (음식점·소매·서비스업 등 실제 영업장 보유자)",
    how_to_apply: "소상공인시장진흥공단 홈페이지 사업장 환경개선 신청 페이지에서 온라인 신청",
    tip: "<b>소상공인시장진흥공단 환경개선 신청 페이지</b>로 이어져요. 신청 전에 견적서를 먼저 받아두세요. 공사 업체 2곳 이상의 견적서가 필요한 경우가 많아요. 이미 공사를 진행했다면 소급 지원이 안 되니, 공사 착수 전에 반드시 신청 먼저 하세요.",
    franchiseEligible: false,
    maxRevenueTier: 2,
    regions: ["전국"],
    industries: ["전체"],
    apply_url: SEMAS_ENV,
    category: "환경개선",
    color: "orange",
  },
  {
    id: "e006",
    title: "소상공인 디지털 전환 바우처",
    org: "중소벤처기업부",
    amount: "최대 400만원",
    rate: null,
    deadline: "2026-06-09",
    start: "2026-05-12",
    summary: "가게에 POS·키오스크·배달앱 도입 시 비용을 바우처로 지원해요",
    detail: "소상공인의 디지털 전환을 위해 POS시스템, 키오스크, 배달앱 입점, SNS 마케팅 도구 구입·구독 비용을 최대 400만원까지 바우처로 지원합니다. 사업자등록증과 통장사본만으로 신청 가능합니다.",
    target: "디지털 전환을 원하는 전국 소상공인 (음식점·소매·미용 등 실물 매장 운영자 우선)",
    how_to_apply: "소상공인24(sbiz24.kr)에서 디지털 바우처 관련 공고 확인 및 신청",
    tip: "<b>바우처 발급 후에는 지정된 공급기업에서만 구매</b>가 가능해요. 원하는 장비나 서비스 업체가 지정 공급기업 목록에 있는지 먼저 확인해보는 게 좋아요.",
    franchiseEligible: true,
    maxRevenueTier: 3,
    regions: ["전국"],
    industries: ["전체"],
    apply_url: SBIZ24,
    category: "디지털",
    color: "blue",
  },
];

// ── 예비 사장님 공고 ──────────────────────────────
const PROSPECTIVE_GRANTS = [
  {
    id: "p001",
    title: "신사업창업사관학교",
    org: "소상공인시장진흥공단",
    amount: "교육 무료 + 최대 1,000만원",
    rate: null,
    deadline: "2026-05-25",
    start: "2026-04-15",
    summary: "가게 창업 교육부터 사업화 자금까지 소상공인진흥공단이 원스톱으로 지원해요",
    detail: "음식점, 소매업, 서비스업 등 소상공인 창업을 준비하는 예비 사장님을 위해 4주 집중 창업 교육과 함께 사업화 자금 최대 1,000만원을 지원합니다. 점포 없이도 참여 가능하며 교육 수료 후 우수자에게 추가 지원이 있습니다.",
    target: "소상공인 업종(음식점·소매·미용·서비스 등) 창업을 준비 중인 예비 사장님",
    how_to_apply: "소상공인시장진흥공단 홈페이지 신사업창업사관학교 신청 페이지에서 온라인 신청",
    tip: "<b>소상공인시장진흥공단 신사업창업사관학교 신청 페이지</b>로 이어져요. 매년 상·하반기 두 차례 모집해요. 이번 기수 마감 전에 신청해야 다음 기수까지 기다리지 않아도 돼요. 간단한 창업 계획서 작성이 필요하니 미리 준비해두세요.",
    stageRange: [0, 2],
    regions: ["전국"],
    industries: ["전체"],
    apply_url: SEMAS_NEWBIZ,
    category: "창업교육",
    color: "green",
  },
  {
    id: "p002",
    title: "소상공인 창업자금 융자",
    org: "소상공인시장진흥공단",
    amount: "최대 7,000만원",
    rate: "연 2.0%",
    deadline: "2026-06-15",
    start: "2026-05-01",
    summary: "매장 보증금·인테리어·장비 등 가게 차리는 데 필요한 초기 자금을 저금리로 지원해요",
    detail: "점포 임차 보증금, 인테리어 공사비, 집기·조리장비 구입 등 가게 창업 초기 비용을 연 2.0% 저금리로 최대 7,000만원까지 융자 지원합니다. 음식점, 소매업, 미용업 등 소상공인 업종 해당자라면 신청 가능합니다.",
    target: "사업자등록 예정 또는 창업 1년 미만 소상공인 (음식점·소매·서비스 등 실물 점포 창업자)",
    how_to_apply: "소상공인시장진흥공단 홈페이지 정책자금 신청 페이지에서 온라인 신청 또는 지역 소상공인지원센터 방문",
    tip: "<b>소상공인시장진흥공단 정책자금 신청 페이지</b>로 이어져요. 융자 심사에 신용점수가 영향을 줘요. 카드 연체 이력이 있다면 미리 정리하고 신청하는 게 유리해요. 사업자등록증이 없어도 신청은 가능하지만, 실제 자금 집행은 등록 후에 이뤄져요.",
    stageRange: [1, 3],
    regions: ["전국"],
    industries: ["전체"],
    apply_url: SEMAS_LOAN,
    category: "창업자금",
    color: "orange",
  },
  {
    id: "p003",
    title: "청년 점포 임차료 지원",
    org: "중소벤처기업부",
    amount: "월 최대 50만원 · 12개월",
    rate: null,
    deadline: "2026-05-31",
    start: "2026-05-01",
    summary: "청년 소상공인 창업자의 점포 월세 부담을 12개월간 덜어드려요",
    detail: "만 39세 이하 청년 소상공인 창업자의 점포 임차료를 월 최대 50만원씩 12개월간 지원합니다. 실제 점포(영업장) 임대차 계약 체결 후 3개월 이내 신청 가능합니다.",
    target: "만 39세 이하 청년, 실물 점포 임대차 계약 체결 예정 또는 3개월 이내 계약한 소상공인 예정자",
    how_to_apply: "소상공인24(sbiz24.kr)에서 청년 임차료 지원 공고 확인 및 신청",
    tip: "<b>임대차 계약 후 3개월 이내에만 신청 가능해요.</b> 계약서 쓰고 입주 준비하다 보면 금방 지나가니, 계약 직후에 바로 신청하는 습관을 들이세요. 임대인 동의서가 필요한 경우도 있어요.",
    stageRange: [2, 4],
    regions: ["전국"],
    industries: ["전체"],
    apply_url: SBIZ24,
    category: "임차지원",
    color: "blue",
  },
  {
    id: "p004",
    title: "스마트 상점 기술보급",
    org: "중소벤처기업부",
    amount: "최대 300만원",
    rate: null,
    deadline: "2026-06-20",
    start: "2026-05-15",
    summary: "오픈 준비 중인 가게에 키오스크·POS·스마트 결제단말기 설치 비용을 지원해요",
    detail: "신규 오픈 예정 소상공인에게 키오스크, POS시스템, 스마트 결제단말기 등 디지털 장비 구입·설치 비용을 최대 300만원까지 지원합니다. 음식점, 카페, 소매 등 점포형 소상공인 업종 우선 선발합니다.",
    target: "창업 6개월 이내 소상공인 또는 오픈 예정 점포형 사업자 (음식점·카페·소매·서비스업)",
    how_to_apply: "소상공인24(sbiz24.kr)에서 스마트상점 기술보급 공고 확인 및 신청",
    tip: "원하는 장비 업체가 <b>스마트상점 지원사업 지정 공급기업</b>인지 먼저 확인해야 해요. 지정 외 업체 구매 시 지원이 안 되니, 공고문에서 목록 먼저 확인해보세요.",
    stageRange: [3, 4],
    regions: ["전국"],
    industries: ["전체"],
    apply_url: SBIZ24,
    category: "디지털",
    color: "blue",
  },
  {
    id: "p005",
    title: "소상공인 컨설팅 바우처",
    org: "소상공인시장진흥공단",
    amount: "컨설팅 비용 전액 (최대 200만원)",
    rate: null,
    deadline: "2026-06-30",
    start: "2026-05-01",
    summary: "가게 창업 전 메뉴 구성, 상권 분석, 세무·인허가 등 전문가 컨설팅을 무료로 받을 수 있어요",
    detail: "소상공인 창업을 준비하는 예비 사장님에게 상권 분석, 메뉴·상품 구성, 인테리어 컨설팅, 세무·인허가 절차 등 전문가 1:1 컨설팅 비용을 최대 200만원까지 바우처로 지원합니다.",
    target: "소상공인 업종 창업을 준비 중인 예비 사장님 (아이디어 단계~사업자 등록 전)",
    how_to_apply: "소상공인시장진흥공단 홈페이지 컨설팅 신청 페이지에서 바우처 신청 후 지정 컨설팅 기관 선택",
    tip: "<b>소상공인시장진흥공단 컨설팅 신청 페이지</b>로 이어져요. 바우처 발급 후 컨설턴트 매칭까지 1~2주가 걸릴 수 있어요. 창업 일정이 빡빡하다면 서둘러 신청하는 게 좋아요. 상권 분석 컨설팅은 특히 오픈 전에 받아야 의미 있어요.",
    stageRange: [0, 1],
    regions: ["전국"],
    industries: ["전체"],
    apply_url: SEMAS_CNSLT,
    category: "컨설팅",
    color: "green",
  },
];

// ── 셀렉트 옵션 데이터 ────────────────────────────
const INDUSTRIES = [
  "음식점", "카페·디저트", "소매업", "미용·뷰티",
  "의류·패션", "학원·교육", "의원·약국", "서비스업", "기타",
];

const STARTUP_STAGES = [
  { label: "사업 아이디어 수립",         sub: "무엇을 팔지 구상 중이에요" },
  { label: "사업자 등록 및 법적 절차",   sub: "사업자 등록을 앞두고 있어요" },
  { label: "매장 계약 및 인테리어",      sub: "점포를 알아보거나 공사 중이에요" },
  { label: "집기 및 장비 구매",          sub: "필요한 장비를 준비하고 있어요" },
  { label: "영업 준비 및 직원 채용",     sub: "곧 오픈할 준비를 하고 있어요" },
];

// ── 필터 함수 ─────────────────────────────────────
function findExistingGrants({ region, isFranchise, revenueTier }) {
  const isSeoul = region && region.startsWith("서울");
  return EXISTING_GRANTS.filter(g => {
    if (isFranchise && !g.franchiseEligible) return false;
    if (!g.regions.includes("전국")) {
      if (g.regions.includes("서울") && !isSeoul) return false;
    }
    if (revenueTier !== undefined && revenueTier > g.maxRevenueTier) return false;
    return true;
  });
}

function findProspectiveGrants({ stage }) {
  if (stage === undefined || stage === null) return PROSPECTIVE_GRANTS;
  return PROSPECTIVE_GRANTS.filter(g =>
    !g.stageRange || (stage >= g.stageRange[0] && stage <= g.stageRange[1])
  );
}

function getGrantById(id) {
  return [...EXISTING_GRANTS, ...PROSPECTIVE_GRANTS].find(g => g.id === id);
}
