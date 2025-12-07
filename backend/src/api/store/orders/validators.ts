import { z } from 'zod';
import { createFindParams } from '@medusajs/medusa/api/utils/validators';

export const GetOrdersParams = createFindParams();

export const GetOrderParams = createFindParams();

export type CheckoutCartRequest = z.infer<typeof CheckoutCartRequest>;

export const CheckoutCartRequest = z
    .object({
        cart_id: z.string().min(1),
    })
    .strict();
