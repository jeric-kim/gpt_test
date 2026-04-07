import { FunnelBarChart } from '@/components/charts/funnel-bar-chart';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { funnel } from '@/lib/mock/data';

export default function FunnelPage() {
  return (
    <div className="space-y-4">
      <Card className="grid grid-cols-2 gap-3 p-4 md:grid-cols-3 xl:grid-cols-5">
        {['조직', '마켓', '담당자', '국적', '이벤트 코드'].map((f) => (
          <label key={f} className="text-xs text-muted-foreground">{f}<Input placeholder={`${f} 필터`} /></label>
        ))}
      </Card>
      <Card className="p-4">
        <h2 className="mb-3 font-semibold">전환 퍼널 단계</h2>
        <FunnelBarChart data={funnel.map((item) => ({ step: item.step, count: item.count }))} />
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm md:grid-cols-5">
          {funnel.map((item) => (
            <div key={item.step} className="rounded-md bg-muted p-2">
              <p className="font-medium">{item.step}</p>
              <p>{item.count}명 / {item.rate}%</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
