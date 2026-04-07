import { eventCodes, kpis, orgTree, salesCodes, trend } from '@/lib/mock/data';
import { AdminApi } from '@/lib/types/api';

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAdminApi: AdminApi = {
  async getDashboard() {
    await delay();
    return {
      kpis,
      signupTrend: trend.map((d) => ({ date: d.date, value: d.signup })),
      firstRemitTrend: trend.map((d) => ({ date: d.date, value: d.firstRemit })),
      volumeTrend: trend.map((d) => ({ date: d.date, value: d.volume }))
    };
  },
  async getOrgTree() {
    await delay();
    return orgTree;
  },
  async getSalesCodes() {
    await delay();
    return salesCodes;
  },
  async getEventCodes() {
    await delay();
    return eventCodes;
  }
};
