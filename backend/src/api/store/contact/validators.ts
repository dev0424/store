import { z } from 'zod';

export const ContactFormRequest = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    message: z.string(),
});
