import { z } from 'zod';

export const PostAdminCreateProductDocument = z.object({
    url: z.string().url('Invalid URL'),
    type: z.string(),
});
