import { z } from 'zod';

export const CreateSystemFlagRequest = z.object({
    key: z.string(),
    value: z.string(),
    name: z.string(),
});

export const UpdateSystemFlagRequest = z.object({
    id: z.string(),
    key: z.string(),
    value: z.string(),
    name: z.string(),
    created_at: z.string().optional().nullable(),
    updated_at: z.string().optional().nullable(),
    deleted_at: z.string().optional().nullable(),
});
