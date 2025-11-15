import { z } from 'zod';

export const UpdateBillingAddressRequest = z.object({
    id: z.string().optional(),
    address_1: z.string(),
    address_2: z.string().optional(),
    postal_code: z.string(),
    city: z.string(),
    country_code: z.string(),
    province: z.string().optional(),
    created_at: z.string().optional().nullable(),
    updated_at: z.string().optional().nullable(),
    deleted_at: z.string().optional().nullable(),
});
