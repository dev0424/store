import { MedusaResponse } from '@medusajs/framework/http';
import { updateBankAccountWorkflow } from '../../../../../workflows/bank-account/update-bank-account';
import { BankAccount } from '../../../../../lib/types';
import type { AuthenticatedMedusaRequest } from '@medusajs/framework';

export const PUT = async (
    request: AuthenticatedMedusaRequest<BankAccount>,
    response: MedusaResponse,
) => {
    const { result } = await updateBankAccountWorkflow(request.scope).run({
        input: {
            customer_id: request.params.id,
            update: request.body,
        },
    });

    return response.json(result);
};
