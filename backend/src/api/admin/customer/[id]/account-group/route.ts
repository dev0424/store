import type { MedusaResponse, AuthenticatedMedusaRequest } from '@medusajs/framework';
import { AccountGroup } from '../../../../../lib/types';
import { updateAccountGroupWorkflow } from '../../../../../workflows/account-group/update-account-group';

export async function PUT(
    request: AuthenticatedMedusaRequest<AccountGroup>,
    response: MedusaResponse,
) {
    const { result } = await updateAccountGroupWorkflow(request.scope).run({
        input: {
            customer_id: request.params.id,
            update: request.validatedBody,
        },
    });

    response.send(result);
}
