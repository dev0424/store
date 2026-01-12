import { z } from 'zod';

export const CreateActivityRequest = z.object({
    name: z.string(),
});
