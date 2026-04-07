'use client';

import { useState } from 'react';
import { OrgTreeView } from '@/components/tree/org-tree-view';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { orgTree } from '@/lib/mock/data';
import { OrgNode } from '@/lib/types/domain';

export default function OrganizationPage() {
  const [selected, setSelected] = useState<OrgNode>(orgTree[0]);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <Card className="p-4 xl:col-span-1">
        <h2 className="mb-3 font-semibold">조직 트리</h2>
        <OrgTreeView nodes={orgTree} onSelect={setSelected} />
      </Card>

      <Card className="space-y-3 p-4 xl:col-span-2">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">노드 상세</h2>
          <div className="space-x-2">
            <Button size="sm">생성</Button>
            <Button size="sm" variant="outline">수정</Button>
            <Button size="sm" variant="outline">비활성화</Button>
            <Button size="sm" variant="outline">삭제</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="text-sm">티어<Input value={selected.tier} readOnly /></label>
          <label className="text-sm">이름<Input value={selected.name} readOnly /></label>
          <label className="text-sm">부모 ID<Input value={selected.parentId ?? '-'} readOnly /></label>
          <label className="text-sm">세일즈 코드<Input value={selected.salesCode} readOnly /></label>
          <label className="text-sm">상태<Input value={selected.status} readOnly /></label>
          <label className="text-sm">생성일<Input value={selected.createdAt} readOnly /></label>
          <label className="text-sm">수정일<Input value={selected.updatedAt} readOnly /></label>
        </div>
      </Card>
    </div>
  );
}
