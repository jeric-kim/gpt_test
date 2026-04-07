import { EventCode, KpiMetric, OrgNode, SalesCode } from '@/lib/types/domain';

export const kpis: KpiMetric[] = [
  { label: '회원가입 수', value: 1432, delta: '+12.5%' },
  { label: '신원인증 완료', value: 1188, delta: '+9.1%' },
  { label: '계좌인증 완료', value: 1044, delta: '+8.7%' },
  { label: '첫 송금 사용자', value: 722, delta: '+6.9%' },
  { label: '재송금 사용자', value: 351, delta: '+4.8%' },
  { label: '기간 내 고유 송금자', value: 913, delta: '+5.3%' },
  { label: '기간 내 송금 건수', value: 2864, delta: '+11.2%' },
  { label: '기간 내 총 송금액', value: '₩ 4,290,000,000', delta: '+14.4%' }
];

export const trend = [
  { date: '04-01', signup: 180, firstRemit: 92, volume: 510000000 },
  { date: '04-02', signup: 210, firstRemit: 105, volume: 538000000 },
  { date: '04-03', signup: 224, firstRemit: 111, volume: 566000000 },
  { date: '04-04', signup: 205, firstRemit: 102, volume: 550000000 },
  { date: '04-05', signup: 239, firstRemit: 123, volume: 592000000 },
  { date: '04-06', signup: 188, firstRemit: 95, volume: 521000000 },
  { date: '04-07', signup: 186, firstRemit: 94, volume: 513000000 }
];

export const orgTree: OrgNode[] = [
  {
    id: 'hq',
    tier: 'HEAD_OFFICE',
    name: '본사 어드민',
    parentId: null,
    salesCode: 'HQ-ROOT',
    status: 'ACTIVE',
    createdAt: '2025-01-01',
    updatedAt: '2026-04-01',
    children: [
      {
        id: 'org-sea',
        tier: 'ORGANIZATION',
        name: '동남아 권역본부',
        parentId: 'hq',
        salesCode: 'ORG-SEA-001',
        status: 'ACTIVE',
        createdAt: '2025-02-01',
        updatedAt: '2026-03-30',
        children: [
          {
            id: 'mkt-vn',
            tier: 'MARKET',
            name: '베트남 마켓',
            parentId: 'org-sea',
            salesCode: 'MKT-VN-101',
            status: 'ACTIVE',
            createdAt: '2025-03-01',
            updatedAt: '2026-03-29',
            children: [
              {
                id: 'staff-vn-1',
                tier: 'STAFF',
                name: 'Nguyen Anh',
                parentId: 'mkt-vn',
                salesCode: 'SF-VN-7781',
                status: 'ACTIVE',
                createdAt: '2025-03-12',
                updatedAt: '2026-03-28'
              }
            ]
          }
        ]
      }
    ]
  }
];

export const salesCodes: SalesCode[] = [
  {
    code: 'ORG-SEA-001',
    type: '조직',
    tier: 'ORGANIZATION',
    organization: '동남아 권역본부',
    market: '-',
    owner: '김도윤',
    status: 'ACTIVE',
    createdAt: '2025-02-01',
    expiredAt: '2027-02-01',
    signupCount: 4210,
    remitAmount: 1620000000
  },
  {
    code: 'MKT-VN-101',
    type: '파트너',
    tier: 'MARKET',
    organization: '동남아 권역본부',
    market: '베트남',
    owner: 'Tran Linh',
    status: 'ACTIVE',
    createdAt: '2025-03-01',
    expiredAt: '2026-12-31',
    signupCount: 1901,
    remitAmount: 720000000
  }
];

export const eventCodes: EventCode[] = [
  {
    eventCode: 'VNSPRING26',
    salesCode: 'MKT-VN-101',
    issuer: 'Tran Linh',
    targetScope: '베트남 신규 가입자',
    status: 'ACTIVE',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    benefit: '첫 송금 수수료 50% 할인',
    signups: 320,
    remittanceUsers: 156,
    conversionRate: 48.8
  }
];

export const funnel = [
  { step: '회원가입', count: 1432, rate: 100 },
  { step: '신원인증', count: 1188, rate: 82.9 },
  { step: '계좌인증', count: 1044, rate: 72.9 },
  { step: '첫 송금', count: 722, rate: 50.4 },
  { step: '재송금', count: 351, rate: 24.5 }
];

export const customers = Array.from({ length: 40 }).map((_, i) => ({
  id: i + 1,
  nationality: i % 2 ? '베트남' : '필리핀',
  signupDate: `2026-03-${String((i % 28) + 1).padStart(2, '0')}`,
  lastLogin: `2026-04-${String((i % 7) + 1).padStart(2, '0')} 13:2${i % 10}`,
  name: `고객${i + 1}`,
  mobile: `010-85${String(i).padStart(2, '0')}-12${String(i).padStart(2, '0')}`,
  email: `user${i + 1}@example.com`,
  idVerified: i % 3 !== 0,
  accountVerified: i % 4 !== 0,
  finalVerifiedAt: `2026-04-${String((i % 7) + 1).padStart(2, '0')} 15:00`,
  remitCount: (i % 6) + 1,
  firstRemitDate: `2026-03-${String((i % 15) + 1).padStart(2, '0')}`,
  latestRemitDate: `2026-04-${String((i % 7) + 1).padStart(2, '0')}`,
  referralCode: `REF-${1000 + i}`,
  pointBalance: 5000 + i * 120,
  marketingConsent: i % 2 === 0,
  organization: '동남아 권역본부',
  market: i % 2 ? '베트남' : '필리핀',
  staff: i % 2 ? 'Nguyen Anh' : 'Maria Cruz',
  eventCode: i % 2 ? 'VNSPRING26' : 'PHSUMMER26',
  funnelStage: i % 3 ? '첫 송금' : '계좌인증'
}));
