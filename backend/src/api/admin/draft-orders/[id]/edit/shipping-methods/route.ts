import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { AddDraftOrderShippingMethodsWorkflowInput } from '@medusajs/medusa/core-flows';
import { addDraftOrderShippingWorkflow } from '../../../../../../workflows/order/add-shipping-method';

/*
 * Overriding admin route to add shipping method on draft order, in order to emit custom event
 * and notify the customer that the shipping price was calculated.
 */
export async function POST(
    request: MedusaRequest<AddDraftOrderShippingMethodsWorkflowInput>,
    response: MedusaResponse,
) {
    const { id } = request.params;
    const { shipping_option_id, custom_amount } = request.validatedBody;

    const { result } = await addDraftOrderShippingWorkflow(request.scope).run({
        input: {
            order_id: id,
            shipping_option_id,
            custom_amount,
        },
    });

    response.send(result);
}
