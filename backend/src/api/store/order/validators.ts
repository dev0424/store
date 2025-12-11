import { z } from 'zod';
import { createFindParams } from '@medusajs/medusa/api/utils/validators';

export const GetOrdersParams = z
    .object({
        is_draft_order: z
            .preprocess(value => {
                if (typeof value === 'string') {
                    if (value === 'true') {
                        return true;
                    }
                    if (value === 'false') {
                        return false;
                    }
                }
                return value;
            }, z.boolean())
            .optional(),
    })
    .merge(createFindParams());

export const GetOrderParams = createFindParams();

export type CheckoutCartRequest = z.infer<typeof CheckoutCartRequest>;

export const CheckoutCartRequest = z
    .object({
        cart_id: z.string().min(1),
    })
    .strict();
