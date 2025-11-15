import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { updateBillingAddressWorkflow } from '../../../../workflows/update-billing-address';
import { BillingAddress } from '../../../../lib/types';

export const PUT = async (request: MedusaRequest<BillingAddress>, response: MedusaResponse) => {
    const { result } = await updateBillingAddressWorkflow(request.scope).run({
        input: request.validatedBody,
    });

    return response.json(result);
};
