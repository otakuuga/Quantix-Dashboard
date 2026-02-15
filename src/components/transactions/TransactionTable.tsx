import { useMemo, useState } from 'react';
import type { Transaction } from '../../types/fintech';
import { downloadTransactionsCsv } from '../../utils/csv';
import { TransactionDetailModal } from './TransactionDetailModal';

const ROW_HEIGHT = 48;
const VISIBLE_ROWS = 8;

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | Transaction['status']>('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Transaction | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const statusMatch = filter === 'all' || tx.status === filter;
      const queryMatch =
        tx.id.toLowerCase().includes(query.toLowerCase()) || tx.account.toLowerCase().includes(query.toLowerCase());
      return statusMatch && queryMatch;
    });
  }, [transactions, filter, query]);

  const pageSize = 20;
  const pageCount = Math.max(Math.ceil(filtered.length / pageSize), 1);
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const startIndex = Math.floor(scrollTop / ROW_HEIGHT);
  const visible = pageData.slice(startIndex, startIndex + VISIBLE_ROWS);
  const topSpacer = startIndex * ROW_HEIGHT;
  const bottomSpacer = Math.max((pageData.length - (startIndex + visible.length)) * ROW_HEIGHT, 0);

  return (
    <section className="card" aria-label="Transaction history table">
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          className="input max-w-sm"
          placeholder="Search transaction or account"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          aria-label="Search transactions"
        />
        <select
          className="input max-w-[180px]"
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value as 'all' | Transaction['status']);
            setPage(1);
          }}
          aria-label="Filter transactions by status"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
        <button className="btn-primary" onClick={() => downloadTransactionsCsv(filtered)}>
          Export CSV
        </button>
      </div>

      <div className="overflow-hidden rounded-md border border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-6 bg-slate-100 px-3 py-2 text-xs font-semibold uppercase dark:bg-slate-800">
          <span>ID</span>
          <span>Account</span>
          <span>Type</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Timestamp</span>
        </div>
        <div
          className="max-h-[384px] overflow-auto"
          onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
          role="table"
          aria-label="Virtualized transactions"
        >
          <div style={{ height: topSpacer }} />
          {visible.map((tx) => (
            <button
              key={tx.id}
              className="grid h-12 w-full grid-cols-6 items-center border-t border-slate-100 px-3 text-left text-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
              onClick={() => setSelected(tx)}
            >
              <span>{tx.id}</span>
              <span>{tx.account}</span>
              <span>{tx.type}</span>
              <span>{tx.currency + ' ' + tx.amount.toFixed(2)}</span>
              <span>{tx.status}</span>
              <span>{tx.timestamp}</span>
            </button>
          ))}
          <div style={{ height: bottomSpacer }} />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          className="rounded border border-slate-300 px-2 py-1 text-sm dark:border-slate-700"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page} of {pageCount}
        </span>
        <button
          className="rounded border border-slate-300 px-2 py-1 text-sm dark:border-slate-700"
          disabled={page === pageCount}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      <TransactionDetailModal transaction={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
