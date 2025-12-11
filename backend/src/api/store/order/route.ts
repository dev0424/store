import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { checkoutWorkflow } from '../../../workflows/order/checkout';
import { CheckoutCartRequest } from './validators';
import { getOrdersListWorkflow } from '@medusajs/core-flows';

export const GET = async (request: AuthenticatedMedusaRequest, response: MedusaResponse) => {
    const customerId = request.auth_context?.actor_id;
    const isDraftOrder = request.query?.is_draft_order;

    const { result: orders } = await getOrdersListWorkflow(request.scope).run({
        input: {
            fields: request.queryConfig.fields,
            variables: {
                filters: {
                    customer_id: customerId,
                    ...(isDraftOrder && { is_draft_order: isDraftOrder }),
                },
            },
        },
    });

    response.json({ orders });
};

export const POST = async (
    request: AuthenticatedMedusaRequest<CheckoutCartRequest>,
    response: MedusaResponse,
) => {
    const customerId = request.auth_context.actor_id;
    const cartId = request.validatedBody.cart_id;

    const { result: order } = await checkoutWorkflow(request.scope).run({
        input: {
            cart_id: cartId,
            customer_id: customerId,
        },
    });

    return response.json({ order_id: order.id });
};
