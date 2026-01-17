import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { CustomerProfile } from '../../../../../lib/types';
import { updateCustomerProfileWorkflow } from '../../../../../workflows/customer-profile/update-customer-profile';

export const PUT = async (request: MedusaRequest<CustomerProfile>, response: MedusaResponse) => {
    const { result } = await updateCustomerProfileWorkflow(request.scope).run({
        input: {
            customer_id: request.params.id,
            update: request.validatedBody,
        },
    });

    return response.json(result);
};
