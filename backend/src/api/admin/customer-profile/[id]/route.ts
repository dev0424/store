import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { CustomerProfile } from '../../../../lib/types';
import { updateCustomerProfileWorkflow } from '../../../../workflows/update-customer-profile';

export const PUT = async (request: MedusaRequest<CustomerProfile>, response: MedusaResponse) => {
    const { result } = await updateCustomerProfileWorkflow(request.scope).run({
        input: request.validatedBody,
    });

    return response.json(result);
};
