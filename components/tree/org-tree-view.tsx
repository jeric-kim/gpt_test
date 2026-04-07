'use client';

import { OrgNode } from '@/lib/types/domain';
import { Badge } from '@/components/ui/badge';

export function OrgTreeView({ nodes, onSelect }: { nodes: OrgNode[]; onSelect: (node: OrgNode) => void }) {
  return (
    <ul className="space-y-2 text-sm">
      {nodes.map((node) => (
        <li key={node.id}>
          <button
            className="flex w-full items-center justify-between rounded-md border border-border bg-white p-2 text-left hover:bg-muted"
            onClick={() => onSelect(node)}
          >
            <span>{node.name}</span>
            <Badge>{node.tier}</Badge>
          </button>
          {node.children && <div className="ml-4 mt-2 border-l border-border pl-3"><OrgTreeView nodes={node.children} onSelect={onSelect} /></div>}
        </li>
      ))}
    </ul>
  );
}
