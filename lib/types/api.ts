import { EventCode, KpiMetric, OrgNode, SalesCode } from '@/lib/types/domain';

export interface DateFilter {
  from: string;
  to: string;
}

export interface AnalyticsFilter extends DateFilter {
  organization?: string;
  market?: string;
  individual?: string;
  salesCode?: string;
  eventCode?: string;
  nationality?: string;
}

export interface AdminApi {
  getDashboard(period: 'daily' | 'weekly' | 'monthly'): Promise<{
    kpis: KpiMetric[];
    signupTrend: Array<{ date: string; value: number }>;
    firstRemitTrend: Array<{ date: string; value: number }>;
    volumeTrend: Array<{ date: string; value: number }>;
  }>;
  getOrgTree(): Promise<OrgNode[]>;
  getSalesCodes(): Promise<SalesCode[]>;
  getEventCodes(): Promise<EventCode[]>;
}
