import { z } from 'zod';

export const PostAdminCreateProductDocument = z.object({
    url: z.url('Invalid URL'),
    type: z.string(),
});
