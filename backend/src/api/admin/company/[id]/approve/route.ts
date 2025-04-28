import type { MedusaResponse, AuthenticatedMedusaRequest } from '@medusajs/framework';
import { updateCustomersWorkflow } from '@medusajs/medusa/core-flows';

export async function POST(request: AuthenticatedMedusaRequest, response: MedusaResponse) {
    const { id } = request.params;

    const { result } = await updateCustomersWorkflow(request.scope).run({
        input: {
            selector: {
                id: [id],
            },
            update: {
                metadata: {
                    status: 'approved',
                },
            },
        },
    });

    response.send(result);
}
