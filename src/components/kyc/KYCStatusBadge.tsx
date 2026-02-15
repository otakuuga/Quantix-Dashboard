import clsx from 'clsx';

type BadgeStatus = 'verified' | 'pending' | 'rejected';

const badgeStyle: Record<BadgeStatus, string> = {
  verified: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500',
  pending: 'border-amber-500/20 bg-amber-500/10 text-amber-500',
  rejected: 'border-rose-500/20 bg-rose-500/10 text-rose-500',
};

export function KYCStatusBadge({ status }: { status: BadgeStatus }) {
  return (
    <span className={clsx('rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider', badgeStyle[status])}>
      KYC {status}
    </span>
  );
}
