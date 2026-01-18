import type { MedusaResponse } from '@medusajs/framework/http';
import { AuthenticatedMedusaRequest } from '@medusajs/framework';
import { AccountGroup } from 'lib/types';
import { updateAccountGroupWorkflow } from '../../../../../workflows/account-group/update-account-group';

type UpdateAccountGroupRequest = Partial<AccountGroup>;

export const PATCH = async (
    request: AuthenticatedMedusaRequest<UpdateAccountGroupRequest>,
    response: MedusaResponse,
) => {
    const customerId = request.auth_context?.actor_id;

    const { result } = await updateAccountGroupWorkflow(request.scope).run({
        input: {
            customer_id: customerId,
            update: request.body,
        },
    });

    response.json(result);
};
