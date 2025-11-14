import { z } from 'zod';

export const UpdateAccountStatusRequest = z.object({
    id: z.string(),
    application_status: z.enum(['PENDING', 'APPROVED', 'DECLINED']),
    is_searchable: z.boolean(),
    created_at: z.string().optional().nullable(),
    updated_at: z.string().optional().nullable(),
    deleted_at: z.string().optional().nullable(),
});
