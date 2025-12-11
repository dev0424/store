import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { deleteDraftOrdersWorkflow } from '@medusajs/medusa/core-flows';

export const DELETE = async (request: AuthenticatedMedusaRequest, response: MedusaResponse) => {
    // TODO validate if customer decline his own draft order
    const customerId = request.auth_context?.actor_id;
    const { id } = request.params;

    await deleteDraftOrdersWorkflow(request.scope).run({
        input: {
            order_ids: [id],
        },
    });

    response.send({ success: true });
};
