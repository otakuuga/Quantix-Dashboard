import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { KYCStatusBadge } from './KYCStatusBadge';
import { kycSchema, type KYCFormData } from '../../schemas/kycSchema';

export function KYCWizard() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [badgeStatus, setBadgeStatus] = useState<'pending' | 'verified' | 'rejected'>('pending');
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<KYCFormData>({
    defaultValues: {
      idType: 'passport',
    },
    mode: 'onBlur',
  });

  const progress = useMemo(() => (step / 3) * 100, [step]);

  const validateStep = () => {
    if (step === 1) {
      const result = z
        .object({
          fullName: kycSchema.shape.fullName,
          email: kycSchema.shape.email,
          address: kycSchema.shape.address,
        })
        .safeParse(getValues());

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const field = issue.path[0];
          if (typeof field === 'string') setError(field as keyof KYCFormData, { message: issue.message });
        });
      }

      return result.success;
    }

    const result = z
      .object({
        idType: kycSchema.shape.idType,
        idNumber: kycSchema.shape.idNumber,
        document: kycSchema.shape.document,
      })
      .safeParse(getValues());

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === 'string') setError(field as keyof KYCFormData, { message: issue.message });
      });
    }

    return result.success;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(3, prev + 1));
    }
  };

  const handleSubmit = () => {
    const payload = getValues();
    const parsed = kycSchema.safeParse(payload);

    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === 'string') setError(field as keyof KYCFormData, { message: issue.message });
      });
      setBadgeStatus('rejected');
      return;
    }

    setBadgeStatus('pending');
    setSubmitted(true);
    setStep(3);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">KYC Onboarding</h2>
        <KYCStatusBadge status={badgeStatus} />
      </div>

      <div className="mb-6 grid grid-cols-3 gap-2">
        {[1, 2, 3].map((index) => (
          <div key={index} className={`h-1.5 rounded-full transition-colors ${step >= index ? 'bg-sky-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
        ))}
      </div>

      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">Progress: {Math.round(progress)}%</p>

      {step === 1 && (
        <div className="space-y-4 transition-all duration-300">
          <h3 className="text-base font-semibold">Personal Information</h3>
          <label className="block text-sm">
            Full Name
            <input className="input" {...register('fullName')} />
            {errors.fullName && <p className="mt-1 text-xs text-rose-500">{errors.fullName.message}</p>}
          </label>

          <label className="block text-sm">
            Email
            <input className="input" type="email" {...register('email')} />
            {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
          </label>

          <label className="block text-sm">
            Full Address
            <textarea className="input min-h-24" {...register('address')} />
            {errors.address && <p className="mt-1 text-xs text-rose-500">{errors.address.message}</p>}
          </label>

          <button type="button" className="btn-primary w-full" onClick={nextStep}>
            Next: Identity Verification
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 transition-all duration-300">
          <h3 className="text-base font-semibold">Document Upload</h3>
          <label className="block text-sm">
            ID Type
            <select className="input" {...register('idType')}>
              <option value="passport">Passport</option>
              <option value="drivers_license">Driver's License</option>
              <option value="national_id">National ID</option>
            </select>
          </label>

          <label className="block text-sm">
            ID Number
            <input className="input" {...register('idNumber')} />
            {errors.idNumber && <p className="mt-1 text-xs text-rose-500">{errors.idNumber.message}</p>}
          </label>

          <label
            htmlFor="kyc-upload"
            className="block cursor-pointer rounded-xl border-2 border-dashed border-slate-300 p-8 text-center transition-colors hover:border-sky-500 dark:border-slate-700"
          >
            <p className="text-sm text-slate-500 dark:text-slate-300">Drag and drop your ID scan or click to browse</p>
            <input
              id="kyc-upload"
              type="file"
              accept="image/*,.pdf"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setValue('document', file, { shouldDirty: true });
                clearErrors('document');
                if (file?.type.startsWith('image/')) {
                  setPreview(URL.createObjectURL(file));
                } else {
                  setPreview(null);
                }
              }}
            />
          </label>

          {preview ? <img src={preview} alt="Document preview" className="max-h-44 rounded-lg border border-slate-200 dark:border-slate-700" /> : null}
          {errors.document && <p className="text-xs text-rose-500">{errors.document.message}</p>}

          <div className="flex gap-3">
            <button type="button" className="w-full rounded-lg border border-slate-300 py-2 text-sm dark:border-slate-700" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="button" className="btn-primary w-full" onClick={handleSubmit}>
              Submit KYC
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="py-8 text-center">
          <p className="mb-2 text-4xl">✅</p>
          <h3 className="text-xl font-bold">Verification Pending</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            We are reviewing your documents. This usually takes 2–4 hours.
          </p>
          <button type="button" className="mt-4 font-medium text-sky-600 hover:underline">
            Return to Dashboard
          </button>
        </div>
      )}
    </section>
  );
}
