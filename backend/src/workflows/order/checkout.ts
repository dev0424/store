import {
    createWorkflow,
    transform,
    WorkflowResponse,
    when,
} from '@medusajs/framework/workflows-sdk';
import { useQueryGraphStep } from '@medusajs/medusa/core-flows';
import { determineCheckoutMode } from '../../lib/cart';
import { CheckoutMode } from '../../lib/types';
import { cartFields } from './query-config';
import { quoteCheckoutWorkflow } from './quote-checkout';
import { standardCheckoutWorkflow } from './standard-checkout';

type WorkflowInput = {
    cart_id: string;
    customer_id: string;
};

/*
 * Workflow that decides whether to perform a quote (draft order) checkout or a standard (order) checkout based on the cart composition and the total cart value.
 */
export const checkoutWorkflow = createWorkflow('checkout', (input: WorkflowInput) => {
    const { data: carts } = useQueryGraphStep({
        entity: 'cart',
        fields: cartFields,
        filters: { id: input.cart_id },
        options: {
            throwIfKeyNotFound: true,
        },
    }).config({ name: 'cart-query' });

    const checkoutMode = transform({ carts }, ({ carts }) => {
        const cart = carts[0];
        return determineCheckoutMode(cart);
    });

    const quote = when(
        { checkoutMode, input },
        ({ checkoutMode }) => checkoutMode === CheckoutMode.QUOTE,
    ).then(() => {
        // @ts-ignore Expression produces a union type that is too complex to represent https://docs.medusajs.com/resources/troubleshooting/query/expression-type-error
        return quoteCheckoutWorkflow.runAsStep({
            input: {
                cart_id: input.cart_id,
                customer_id: input.customer_id,
            },
        });
    });

    const order = when(
        { checkoutMode, input },
        ({ checkoutMode }) => checkoutMode === CheckoutMode.ORDER,
    ).then(() => {
        return standardCheckoutWorkflow.runAsStep({
            input: {
                cart_id: input.cart_id,
            },
        });
    });

    // Pick whichever branch actually produced a value
    const result = transform({ quote, order }, ({ quote, order }) => {
        return quote || order;
    });

    return new WorkflowResponse(result);
});
