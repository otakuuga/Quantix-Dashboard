import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { KYCStatus } from '../../types/fintech';

const kycSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email required'),
  country: z.string().min(2, 'Country is required'),
  idType: z.enum(['passport', 'driver_license', 'national_id']),
  idNumber: z.string().min(5, 'ID number must be at least 5 characters'),
  document: z.instanceof(File).optional(),
});

type KYCFormData = z.infer<typeof kycSchema>;

const statusLabel: Record<KYCStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  submitted: 'Submitted',
  verified: 'Verified',
  rejected: 'Rejected',
};

export function KYCWizard() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<KYCStatus>('in_progress');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<KYCFormData>({
    defaultValues: { idType: 'passport' },
    mode: 'onBlur',
  });

  const progress = useMemo(() => (step / 3) * 100, [step]);

  const validateStep = async () => {
    if (step === 1) {
      const fields: (keyof KYCFormData)[] = ['fullName', 'email'];
      const valid = await trigger(fields);
      if (!valid) return false;

      const parse = z.object({ fullName: kycSchema.shape.fullName, email: kycSchema.shape.email }).safeParse(getValues());
      return parse.success;
    }

    if (step === 2) {
      const fields: (keyof KYCFormData)[] = ['country', 'idType', 'idNumber'];
      const valid = await trigger(fields);
      if (!valid) return false;

      const parse = z
        .object({
          country: kycSchema.shape.country,
          idType: kycSchema.shape.idType,
          idNumber: kycSchema.shape.idNumber,
        })
        .safeParse(getValues());
      return parse.success;
    }

    clearErrors('document');
    return true;
  };

  const next = async () => {
    if (await validateStep()) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const onSubmit = handleSubmit((data) => {
    const parse = kycSchema.safeParse(data);
    if (!parse.success) {
      for (const issue of parse.error.issues) {
        const field = issue.path[0];
        if (typeof field === 'string') {
          setError(field as keyof KYCFormData, { message: issue.message });
        }
      }
      return;
    }
    setStatus('submitted');
  });

  return (
    <section className="card" aria-label="KYC form wizard">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">KYC Workflow</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800" aria-live="polite">
          {statusLabel[status]}
        </span>
      </div>
      <div className="mb-4 h-2 rounded bg-slate-200 dark:bg-slate-700">
        <div className="h-full rounded bg-sky-600 transition-all" style={{ width: `${progress}%` }} />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {step === 1 && (
          <>
            <label className="block text-sm">
              Full name
              <input className="input" {...register('fullName')} aria-invalid={Boolean(errors.fullName)} />
              {errors.fullName && <p className="mt-1 text-xs text-rose-600">{errors.fullName.message}</p>}
            </label>
            <label className="block text-sm">
              Email
              <input className="input" {...register('email')} aria-invalid={Boolean(errors.email)} />
              {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
            </label>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block text-sm">
              Country
              <input className="input" {...register('country')} aria-invalid={Boolean(errors.country)} />
              {errors.country && <p className="mt-1 text-xs text-rose-600">{errors.country.message}</p>}
            </label>
            <label className="block text-sm">
              ID Type
              <select className="input" {...register('idType')}>
                <option value="passport">Passport</option>
                <option value="driver_license">Driver License</option>
                <option value="national_id">National ID</option>
              </select>
            </label>
            <label className="block text-sm">
              ID Number
              <input className="input" {...register('idNumber')} aria-invalid={Boolean(errors.idNumber)} />
              {errors.idNumber && <p className="mt-1 text-xs text-rose-600">{errors.idNumber.message}</p>}
            </label>
          </>
        )}

        {step === 3 && (
          <label className="block text-sm">
            Upload verification document
            <input
              className="input"
              type="file"
              accept="image/*,.pdf"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setValue('document', file, { shouldDirty: true, shouldTouch: true });
                clearErrors('document');
              }}
            />
            {watch('document') && <p className="mt-1 text-xs text-emerald-600">Document selected</p>}
            {errors.document && <p className="mt-1 text-xs text-rose-600">{errors.document.message}</p>}
          </label>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700"
            onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
            disabled={step === 1}
          >
            Back
          </button>
          {step < 3 ? (
            <button type="button" className="btn-primary" onClick={next}>
              Next
            </button>
          ) : (
            <button type="submit" className="btn-primary">
              Submit KYC
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
