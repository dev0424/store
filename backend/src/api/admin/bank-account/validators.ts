import { z } from 'zod';

export const UpdateBankAccount = z.object({
    id: z.string().optional(),
    created_at: z.string().optional().nullable(),
    updated_at: z.string().optional().nullable(),
    deleted_at: z.string().optional().nullable(),
    bank_name: z.string(),
    bank_code: z.string(),
    branch_code: z.string(),
    city: z.string(),
    address: z.string(),
    account_number: z.string(),
    account_holder: z.string(),
    iban: z.string(),
    bic: z.string(),
    rib_key: z.string(),
});
