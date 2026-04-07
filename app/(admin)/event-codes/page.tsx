'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { eventCodes } from '@/lib/mock/data';
import { EventCode } from '@/lib/types/domain';

const columns: ColumnDef<EventCode>[] = [
  { header: '이벤트 코드', accessorKey: 'eventCode' },
  { header: '연결 세일즈 코드', accessorKey: 'salesCode' },
  { header: '발급자', accessorKey: 'issuer' },
  { header: '대상 범위', accessorKey: 'targetScope' },
  { header: '상태', accessorKey: 'status' },
  { header: '시작일', accessorKey: 'startDate' },
  { header: '종료일', accessorKey: 'endDate' },
  { header: '혜택', accessorKey: 'benefit' },
  { header: '가입 성과', accessorKey: 'signups' },
  { header: '송금 성과', accessorKey: 'remittanceUsers' },
  { header: '전환율(%)', accessorKey: 'conversionRate' }
];

export default function EventCodesPage() {
  return (
    <div className="space-y-3">
      <div className="flex justify-end gap-2">
        <Button>이벤트 생성</Button>
        <Button variant="outline">편집</Button>
        <Button variant="outline">비활성화</Button>
        <Button variant="outline">복사</Button>
      </div>
      <DataTable columns={columns} data={eventCodes} />
    </div>
  );
}
