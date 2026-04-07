'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/tables/data-table';
import { Button } from '@/components/ui/button';
import { salesCodes } from '@/lib/mock/data';
import { SalesCode } from '@/lib/types/domain';

const columns: ColumnDef<SalesCode>[] = [
  { header: '코드', accessorKey: 'code' },
  { header: '유형', accessorKey: 'type' },
  { header: '티어', accessorKey: 'tier' },
  { header: '조직', accessorKey: 'organization' },
  { header: '마켓', accessorKey: 'market' },
  { header: '담당자', accessorKey: 'owner' },
  { header: '상태', accessorKey: 'status' },
  { header: '생성일', accessorKey: 'createdAt' },
  { header: '만료일', accessorKey: 'expiredAt' },
  { header: '가입수', accessorKey: 'signupCount' },
  { header: '송금액', accessorKey: 'remitAmount' }
];

export default function SalesCodesPage() {
  return (
    <div className="space-y-3">
      <div className="flex justify-end gap-2">
        <Button>코드 생성</Button>
        <Button variant="outline">편집</Button>
        <Button variant="outline">비활성화</Button>
        <Button variant="outline">복사</Button>
      </div>
      <DataTable columns={columns} data={salesCodes} />
    </div>
  );
}
