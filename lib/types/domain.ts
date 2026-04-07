export type Tier = 'HEAD_OFFICE' | 'ORGANIZATION' | 'MARKET' | 'STAFF';
export type Status = 'ACTIVE' | 'INACTIVE';

export interface OrgNode {
  id: string;
  tier: Tier;
  name: string;
  parentId: string | null;
  salesCode: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  children?: OrgNode[];
}

export interface KpiMetric {
  label: string;
  value: number | string;
  delta: string;
}

export interface SalesCode {
  code: string;
  type: '추천' | '파트너' | '조직';
  tier: Tier;
  organization: string;
  market: string;
  owner: string;
  status: Status;
  createdAt: string;
  expiredAt: string;
  signupCount: number;
  remitAmount: number;
}

export interface EventCode {
  eventCode: string;
  salesCode: string;
  issuer: string;
  targetScope: string;
  status: Status;
  startDate: string;
  endDate: string;
  benefit: string;
  signups: number;
  remittanceUsers: number;
  conversionRate: number;
}
