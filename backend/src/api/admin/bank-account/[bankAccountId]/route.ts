import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { updateBankAccountWorkflow } from '../../../../workflows/update-bank-account';
import { BankAccount } from '../../../../lib/types';

export const PUT = async (request: MedusaRequest<BankAccount>, response: MedusaResponse) => {
    const { result } = await updateBankAccountWorkflow(request.scope).run({
        input: request.validatedBody,
    });

    return response.json(result);
};
