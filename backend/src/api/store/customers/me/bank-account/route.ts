import type { MedusaResponse } from '@medusajs/framework/http';
import { AuthenticatedMedusaRequest } from '@medusajs/framework';
import { updateBankAccountWorkflow } from '../../../../../workflows/bank-account/update-bank-account';
import { BankAccount } from 'lib/types';

type UpdateBankAccountRequest = Partial<BankAccount>;

export const PATCH = async (
    request: AuthenticatedMedusaRequest<UpdateBankAccountRequest>,
    response: MedusaResponse,
) => {
    const customerId = request.auth_context?.actor_id;

    const { result } = await updateBankAccountWorkflow(request.scope).run({
        input: {
            customer_id: customerId,
            update: request.body,
        },
    });

    response.json(result);
};
