import { z } from 'zod';

export const UpdateLocationRequest = z.object({
    id: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    created_at: z.string().optional().nullable(),
    updated_at: z.string().optional().nullable(),
    deleted_at: z.string().optional().nullable(),
});
