import { createWorkflow, WorkflowResponse } from '@medusajs/framework/workflows-sdk';
import { addDraftOrderShippingMethodsWorkflow, emitEventStep } from '@medusajs/medusa/core-flows';
import { BigNumberInput } from '@medusajs/types';

type WorkflowInput = {
    order_id: string;
    shipping_option_id: string;
    custom_amount?: BigNumberInput;
};

/*
 * Wrapper function on addDraftOrderShippingMethodsWorkflow to emit custom draft-order.shipping-added event.
 */
export const addDraftOrderShippingWorkflow = createWorkflow(
    'add-draft-order-shipping',
    (input: WorkflowInput) => {
        const result = addDraftOrderShippingMethodsWorkflow.runAsStep({
            input: {
                order_id: input.order_id,
                shipping_option_id: input.shipping_option_id,
                custom_amount: input.custom_amount,
            },
        });

        emitEventStep({
            eventName: 'draft-order.shipping-added',
            data: {
                order_id: input.order_id,
                shipping_option_id: input.shipping_option_id,
                custom_amount: input.custom_amount,
            },
        });

        return new WorkflowResponse(result);
    },
);
