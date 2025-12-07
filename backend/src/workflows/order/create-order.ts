import { createWorkflow, transform, WorkflowResponse } from '@medusajs/framework/workflows-sdk';
import { OrderStatus } from '@medusajs/framework/utils';
import {
    createOrderWorkflow,
    type CreateOrderWorkflowInput,
    useQueryGraphStep,
} from '@medusajs/medusa/core-flows';
import { determineCheckoutMode } from '../../lib/cart';
import { CheckoutMode } from '../../lib/types';
import { cartFields, customerFields } from './query-config';

type WorkflowInput = {
    cart_id: string;
    customer_id: string;
};

export const checkoutWorkflow = createWorkflow('checkout', (input: WorkflowInput) => {
    const { data: carts } = useQueryGraphStep({
        entity: 'cart',
        fields: cartFields,
        filters: { id: input.cart_id },
        options: {
            throwIfKeyNotFound: true,
        },
    }).config({ name: 'cart-query' });

    const { data: customers } = useQueryGraphStep({
        entity: 'customer',
        fields: customerFields,
        filters: { id: input.customer_id },
        options: {
            throwIfKeyNotFound: true,
        },
    }).config({ name: 'customer-query' });

    const orderInput = transform({ carts, customers }, ({ carts, customers }) => {
        const cart = carts[0];
        const customer = customers[0];
        const checkoutMode = determineCheckoutMode(cart);
        const isDraftOrder = checkoutMode === CheckoutMode.QUOTE;
        const status = isDraftOrder ? OrderStatus.DRAFT : OrderStatus.PENDING;

        return {
            status,
            is_draft_order: isDraftOrder,
            sales_channel_id: cart.sales_channel_id || undefined,
            email: customer.email || undefined,
            customer_id: customer.id || undefined,
            billing_address: cart.billing_address,
            shipping_address: cart.shipping_address,
            items: (cart.items || []) as CreateOrderWorkflowInput['items'],
            region_id: cart.region_id || undefined,
            promo_codes: cart.promotions?.map(promo => promo?.code),
            currency_code: cart.currency_code,
            shipping_methods: cart.shipping_methods || [],
        } as CreateOrderWorkflowInput;
    });

    const order = createOrderWorkflow.runAsStep({
        input: orderInput,
    });

    return new WorkflowResponse(order);
});
