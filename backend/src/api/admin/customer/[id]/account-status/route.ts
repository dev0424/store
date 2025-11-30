import type { MedusaResponse, AuthenticatedMedusaRequest } from '@medusajs/framework';
import { updateAccountStatusWorkflow } from '../../../../../workflows/account-status/update-account-status';
import { AccountStatus } from '../../../../../lib/types';

export async function PUT(
    request: AuthenticatedMedusaRequest<AccountStatus>,
    response: MedusaResponse,
) {
    const { result } = await updateAccountStatusWorkflow(request.scope).run({
        input: {
            customerId: request.params.id,
            accountStatus: request.validatedBody,
        },
    });

    response.send(result);
}
