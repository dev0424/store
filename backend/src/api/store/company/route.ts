import type { MedusaResponse, AuthenticatedMedusaRequest } from '@medusajs/framework';
import { createCustomerAccountWorkflow } from '@medusajs/medusa/core-flows';
import { CreateCustomerDTO } from '@medusajs/types';

export async function POST(request: AuthenticatedMedusaRequest, response: MedusaResponse) {
    // TODO validate request body
    const customerData: CreateCustomerDTO = request.body;
    const authIdentityId = request.auth_context.auth_identity_id;

    const { result } = await createCustomerAccountWorkflow(request.scope).run({
        input: {
            authIdentityId,
            customerData: {
                ...customerData,
                metadata: {
                    ...customerData.metadata,
                    status: 'pending',
                },
            },
        },
    });

    response.send(result);
}
