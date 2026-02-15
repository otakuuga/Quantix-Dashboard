import type { Transaction } from '../../types/fintech';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export function TransactionDetailModal({ transaction, onClose }: TransactionDetailModalProps) {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Transaction {transaction.id}</h2>
          <button onClick={onClose} className="rounded p-1" aria-label="Close details modal">
            ✕
          </button>
        </div>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <dt className="text-slate-500">Account</dt>
          <dd>{transaction.account}</dd>
          <dt className="text-slate-500">Type</dt>
          <dd>{transaction.type}</dd>
          <dt className="text-slate-500">Amount</dt>
          <dd>
            {transaction.currency} {transaction.amount.toFixed(2)}
          </dd>
          <dt className="text-slate-500">Status</dt>
          <dd>{transaction.status}</dd>
          <dt className="text-slate-500">Timestamp</dt>
          <dd>{transaction.timestamp}</dd>
          {transaction.note && (
            <>
              <dt className="text-slate-500">Note</dt>
              <dd>{transaction.note}</dd>
            </>
          )}
        </dl>
      </div>
    </div>
  );
}
