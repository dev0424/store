import { createWorkflow, WorkflowResponse } from '@medusajs/framework/workflows-sdk';
import { completeCartWorkflow } from '@medusajs/medusa/core-flows';

type WorkflowInput = {
    cart_id: string;
};

/*
 * Workflow that performs a standard (order) checkout by completing a cart.
 * It also reserves the cart items from the inventory.
 */
export const standardCheckoutWorkflow = createWorkflow(
    'standard-checkout',
    (input: WorkflowInput) => {
        const { id: order_id } = completeCartWorkflow.runAsStep({
            input: { id: input.cart_id },
        });

        return new WorkflowResponse({ id: order_id });
    },
);
