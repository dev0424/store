import { z } from 'zod';

export const CreateBillingCycleRequest = z.object({
    name: z.string(),
});
