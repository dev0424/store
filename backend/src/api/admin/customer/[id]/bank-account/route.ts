import { MedusaResponse } from '@medusajs/framework/http';
import { updateBankAccountWorkflow } from '../../../../../workflows/update-bank-account';
import { BankAccount } from '../../../../../lib/types';
import type { AuthenticatedMedusaRequest } from '@medusajs/framework';

export const PUT = async (
    request: AuthenticatedMedusaRequest<BankAccount>,
    response: MedusaResponse,
) => {
    const { result } = await updateBankAccountWorkflow(request.scope).run({
        input: {
            customerId: request.params.id,
            bankAccount: request.validatedBody,
        },
    });

    return response.json(result);
};
