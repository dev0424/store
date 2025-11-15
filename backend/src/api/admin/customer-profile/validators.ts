import { z } from 'zod';

export const UpdateCustomerProfileRequest = z.object({
    id: z.string(),
    vat_number: z.string(),
    siret_number: z.string(),
    ape_code: z.string(),
    activity: z.string(),
    billing_cycle: z.string(),
    payment_method: z.string(),
    invoice_email: z.string(),
    created_at: z.string().optional().nullable(),
    updated_at: z.string().optional().nullable(),
    deleted_at: z.string().optional().nullable(),
});
