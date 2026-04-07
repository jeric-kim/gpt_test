import { Card } from '@/components/ui/card';

const logs = [
  { at: '2026-04-07 09:10', actor: 'hq_admin', action: '세일즈 코드 수정', target: 'MKT-VN-101' },
  { at: '2026-04-07 09:30', actor: 'org_manager', action: '이벤트 코드 생성', target: 'VNSPRING26' }
];

export default function AuditLogPage() {
  return (
    <Card className="p-0">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-xs"><tr><th className="px-3 py-2 text-left">일시</th><th className="px-3 py-2 text-left">행위자</th><th className="px-3 py-2 text-left">액션</th><th className="px-3 py-2 text-left">대상</th></tr></thead>
        <tbody>{logs.map((log) => <tr key={log.at} className="border-t border-border"><td className="px-3 py-2">{log.at}</td><td className="px-3 py-2">{log.actor}</td><td className="px-3 py-2">{log.action}</td><td className="px-3 py-2">{log.target}</td></tr>)}</tbody>
      </table>
    </Card>
  );
}
