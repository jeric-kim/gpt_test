import { Card } from '@/components/ui/card';
import { LineTrendChart } from '@/components/charts/line-trend-chart';
import { kpis, trend } from '@/lib/mock/data';

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="p-4">
            <p className="text-xs text-muted-foreground">{kpi.label}</p>
            <p className="mt-1 text-xl font-semibold">{kpi.value}</p>
            <p className="mt-1 text-xs text-blue-600">{kpi.delta}</p>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="p-4">
          <h2 className="mb-2 font-semibold">가입 추이</h2>
          <LineTrendChart data={trend} dataKey="signup" />
        </Card>
        <Card className="p-4">
          <h2 className="mb-2 font-semibold">첫 송금 추이</h2>
          <LineTrendChart data={trend} dataKey="firstRemit" color="#10b981" />
        </Card>
        <Card className="p-4">
          <h2 className="mb-2 font-semibold">송금 볼륨 추이</h2>
          <LineTrendChart data={trend} dataKey="volume" color="#f97316" />
        </Card>
        <Card className="p-4">
          <h2 className="mb-2 font-semibold">비교 분석</h2>
          <ul className="space-y-2 text-sm">
            <li>조직 비교: 동남아 권역본부 38%, 일본 권역본부 21%</li>
            <li>마켓 비교: 베트남 +14%, 필리핀 +9%</li>
            <li>이벤트 코드 성과: VNSPRING26 전환율 48.8%</li>
            <li>전환 퍼널: 가입→재송금 24.5%</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
