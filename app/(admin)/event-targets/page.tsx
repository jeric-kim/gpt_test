'use client';

import { useMemo, useState } from 'react';
import { customers } from '@/lib/mock/data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function EventTargetsPage() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [modal, setModal] = useState<'sms' | 'alim' | null>(null);
  const pageSize = 10;

  const filtered = useMemo(() => customers.filter((c) => [c.name, c.nationality, c.market, c.eventCode].join(' ').includes(query)), [query]);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleAll = () => {
    const ids = paged.map((p) => p.id);
    setSelected(ids.every((id) => selected.includes(id)) ? selected.filter((id) => !ids.includes(id)) : [...new Set([...selected, ...ids])]);
  };

  return (
    <div className="space-y-3">
      <Card className="flex flex-wrap items-end gap-2 p-4">
        <label className="text-xs text-muted-foreground">검색<Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="이름/국적/마켓/이벤트 코드" /></label>
        <Button variant="outline" onClick={() => alert('CSV 내보내기 mock')}>내보내기</Button>
        <Button onClick={() => setModal('sms')}>SMS 발송</Button>
        <Button variant="outline" onClick={() => setModal('alim')}>알림톡 발송</Button>
      </Card>
      <Card className="overflow-x-auto">
        <table className="min-w-[1700px] text-xs">
          <thead className="bg-muted/60">
            <tr>
              <th><input type="checkbox" onChange={toggleAll} checked={paged.every((p) => selected.includes(p.id)) && paged.length > 0} /></th>
              {['국적','가입/최근로그인','이름','휴대폰','이메일','신원인증','계좌인증','최종인증일시','송금횟수','첫/최근송금','추천코드','포인트','마케팅동의','조직','마켓','담당','이벤트코드','현재 퍼널','SMS','알림톡'].map((h) => <th key={h} className="px-2 py-2 text-left">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {paged.map((c) => (
              <tr key={c.id} className="border-t border-border">
                <td><input type="checkbox" checked={selected.includes(c.id)} onChange={() => setSelected((prev) => prev.includes(c.id) ? prev.filter((id) => id !== c.id) : [...prev, c.id])} /></td>
                <td>{c.nationality}</td><td className="px-2 py-2">{c.signupDate}<br />{c.lastLogin}</td><td>{c.name}</td><td>{c.mobile}</td><td>{c.email}</td>
                <td>{c.idVerified ? '완료' : '미완료'}</td><td>{c.accountVerified ? '완료' : '미완료'}</td><td>{c.finalVerifiedAt}</td><td>{c.remitCount}</td>
                <td>{c.firstRemitDate}<br />{c.latestRemitDate}</td><td>{c.referralCode}</td><td>{c.pointBalance}</td><td>{c.marketingConsent ? 'Y' : 'N'}</td>
                <td>{c.organization}</td><td>{c.market}</td><td>{c.staff}</td><td>{c.eventCode}</td><td>{c.funnelStage}</td>
                <td><Button size="sm" variant="outline" onClick={() => setModal('sms')}>보내기</Button></td>
                <td><Button size="sm" variant="outline" onClick={() => setModal('alim')}>보내기</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))}>이전</Button>
        <span className="text-sm">{page} / {Math.max(1, Math.ceil(filtered.length / pageSize))}</span>
        <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(Math.ceil(filtered.length / pageSize), p + 1))}>다음</Button>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <Card className="w-full max-w-lg space-y-3 p-4">
            <h3 className="font-semibold">{modal === 'sms' ? 'SMS 발송' : '알림톡 발송'} ({selected.length}명 선택)</h3>
            <label className="text-sm">템플릿 선택
              <select className="mt-1 h-9 w-full rounded-md border border-input bg-white px-3 text-sm">
                <option>기본 프로모션 템플릿</option>
                <option>휴면 고객 리마인드</option>
              </select>
            </label>
            <label className="text-sm">커스텀 메시지
              <textarea className="mt-1 w-full rounded-md border border-input p-2 text-sm" rows={4} placeholder="직접 메시지를 입력하세요" />
            </label>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setModal(null)}>닫기</Button>
              <Button onClick={() => setModal(null)}>발송</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
