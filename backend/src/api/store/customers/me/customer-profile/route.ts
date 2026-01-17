import type { MedusaResponse } from '@medusajs/framework/http';
import { AuthenticatedMedusaRequest } from '@medusajs/framework';
import { CustomerProfile } from 'lib/types';
import { updateCustomerProfileWorkflow } from '../../../../../workflows/customer-profile/update-customer-profile';

type UpdateCustomerProfileRequest = Partial<CustomerProfile>;

export const PATCH = async (
    request: AuthenticatedMedusaRequest<UpdateCustomerProfileRequest>,
    response: MedusaResponse,
) => {
    const customerId = request.auth_context?.actor_id;

    const { result } = await updateCustomerProfileWorkflow(request.scope).run({
        input: {
            customer_id: customerId,
            update: request.body,
        },
    });

    response.json(result);
};
