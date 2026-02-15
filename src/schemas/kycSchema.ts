import { z } from 'zod';

export const kycSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  idType: z.enum(['passport', 'drivers_license', 'national_id']),
  idNumber: z.string().min(5, 'Identification number is required'),
  address: z.string().min(10, 'Please enter a full address'),
  document: z.instanceof(File).optional(),
});

export type KYCFormData = z.infer<typeof kycSchema>;
