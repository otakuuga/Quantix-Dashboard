import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Transaction } from '../../types/fintech';

interface TransactionTableProps {
  data: Transaction[];
}

export function TransactionTable({ data }: TransactionTableProps) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Transaction['status']>('all');

  const filtered = useMemo(
    () =>
      data.filter((tx) => {
        const matchesQuery =
          tx.entity.toLowerCase().includes(query.toLowerCase()) || tx.id.toLowerCase().includes(query.toLowerCase());
        const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
        return matchesQuery && matchesStatus;
      }),
    [data, query, statusFilter]
  );

  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      { header: 'Entity', accessorKey: 'entity' },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          const status = row.original.status;
          const statusClass =
            status === 'completed'
              ? 'bg-emerald-500/10 text-emerald-500'
              : status === 'pending'
                ? 'bg-amber-500/10 text-amber-500'
                : 'bg-rose-500/10 text-rose-500';
          return <span className={`rounded-full px-2 py-1 text-xs ${statusClass}`}>{status}</span>;
        },
      },
      { header: 'Category', accessorKey: 'category' },
      {
        header: 'Amount',
        accessorKey: 'amount',
        cell: ({ row }) => {
          const tx = row.original;
          return (
            <span className={`font-semibold ${tx.type === 'outbound' ? 'text-rose-500' : 'text-emerald-500'}`}>
              {tx.type === 'outbound' ? '-' : '+'}${tx.amount.toLocaleString()}
            </span>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getRowModel().rows;
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 52,
    overscan: 12,
  });

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex flex-wrap gap-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search entity or transaction ID"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          aria-label="Search transactions"
        />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as 'all' | Transaction['status'])}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          aria-label="Filter by transaction status"
        >
          <option value="all">All statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <span className="ml-auto text-xs text-slate-500 dark:text-slate-400">{filtered.length.toLocaleString()} rows</span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 font-medium">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>

        <div ref={parentRef} className="h-[420px] overflow-auto">
          <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <div
                  key={row.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className="border-b border-slate-100 dark:border-slate-800"
                >
                  <table className="w-full text-left text-sm">
                    <tbody>
                      <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-950">
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-4 py-3">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
