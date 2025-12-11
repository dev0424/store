import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { convertDraftOrderWorkflow } from '@medusajs/medusa/core-flows';

export const GET = async (request: AuthenticatedMedusaRequest, response: MedusaResponse) => {
    // TODO validate if customer accepts his own draft order
    const customerId = request.auth_context?.actor_id;
    const { id } = request.params;

    const { result } = await convertDraftOrderWorkflow(request.scope).run({
        input: {
            id,
        },
    });

    response.send(result);
};
