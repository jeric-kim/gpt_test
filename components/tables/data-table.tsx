'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table';

export function DataTable<TData>({ columns, data }: { columns: ColumnDef<TData>[]; data: TData[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  });

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg border border-border bg-white">
        <Table>
          <THead>
            {table.getHeaderGroups().map((hg) => (
              <TR key={hg.id}>
                {hg.headers.map((h) => (
                  <TH key={h.id}>{h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}</TH>
                ))}
              </TR>
            ))}
          </THead>
          <TBody>
            {table.getRowModel().rows.map((row) => (
              <TR key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TD key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TD>
                ))}
              </TR>
            ))}
          </TBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          이전
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          다음
        </Button>
      </div>
    </div>
  );
}
