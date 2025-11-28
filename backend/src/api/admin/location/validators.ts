import { z } from 'zod';

export const UpdateLocationRequest = z.object({
    id: z.string(),
    latitude: z.number().optional().nullable(),
    longitude: z.number().optional().nullable(),
    address_1: z.string().optional().nullable(),
    address_2: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    country_code: z.string().optional().nullable(),
    province: z.string().optional().nullable(),
    postal_code: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
    created_at: z.string().optional().nullable(),
    updated_at: z.string().optional().nullable(),
    deleted_at: z.string().optional().nullable(),
});
