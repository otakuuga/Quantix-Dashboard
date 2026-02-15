import type { Transaction } from '../types/fintech';

export function downloadTransactionsCsv(transactions: Transaction[]) {
  const header = 'id,timestamp,account,type,amount,currency,status,note';
  const rows = transactions.map((tx) =>
    [tx.id, tx.timestamp, tx.account, tx.type, tx.amount.toFixed(2), tx.currency, tx.status, tx.note ?? '']
      .map((field) => `"${String(field).replaceAll('"', '""')}"`)
      .join(',')
  );

  const blob = new Blob([header, ...rows].join('\n'), { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `transactions-${Date.now()}.csv`);
  link.click();
  URL.revokeObjectURL(url);
}
