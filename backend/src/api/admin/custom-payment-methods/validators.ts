import { z } from 'zod';

export const CreateCustomPaymentMethodRequest = z.object({
    name: z.string(),
});
