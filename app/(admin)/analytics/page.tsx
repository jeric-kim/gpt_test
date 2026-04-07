import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const rows = [
  ['동남아 권역본부', 1432, 1188, 1044, 722, 351, 913, 2864, '₩4.29B', '50.4%', '24.5%'],
  ['└ 베트남 마켓', 820, 701, 640, 470, 240, 590, 1701, '₩2.41B', '57.3%', '29.3%'],
  ['  └ Nguyen Anh', 312, 272, 251, 190, 92, 210, 580, '₩0.81B', '60.8%', '29.5%']
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <Card className="grid grid-cols-1 gap-3 p-4 md:grid-cols-3 xl:grid-cols-6">
        {['기간', '조직', '마켓', '개인', '세일즈 코드', '이벤트 코드', '국적'].map((f) => (
          <label key={f} className="text-xs text-muted-foreground">{f}<Input placeholder={`${f} 선택`} /></label>
        ))}
      </Card>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-xs">
            <tr>{['그룹', '가입', '신원인증', '계좌인증', '첫 송금', '재송금', '고유 송금자', '건수', '송금액', '첫송금 전환율', '재송금 전환율'].map((h) => <th key={h} className="px-3 py-2 text-left">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-border">{r.map((c, j) => <td key={j} className="px-3 py-2">{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
