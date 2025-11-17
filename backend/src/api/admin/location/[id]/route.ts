import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { Location } from '../../../../lib/types';
import { updateCustomerProfileWorkflow } from '../../../../workflows/update-location';

export const PUT = async (request: MedusaRequest<Location>, response: MedusaResponse) => {
    const { result } = await updateCustomerProfileWorkflow(request.scope).run({
        input: request.validatedBody,
    });

    return response.json(result);
};
