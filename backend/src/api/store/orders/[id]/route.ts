import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { getOrdersListWorkflow } from '@medusajs/core-flows';

export const GET = async (request: AuthenticatedMedusaRequest, response: MedusaResponse) => {
    const customerId = request.auth_context?.actor_id;
    const { id } = request.params;

    const { result: orders } = await getOrdersListWorkflow(request.scope).run({
        input: {
            fields: request.queryConfig.fields,
            variables: {
                filters: {
                    id,
                    customer_id: customerId,
                },
                take: 1,
            },
        },
    });

    const order = orders[0];

    response.json({ order });
};
