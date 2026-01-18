import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { Location } from '../../../../../lib/types';
import { updateLocationWorkflow } from '../../../../../workflows/location/update-location';

export const PUT = async (request: MedusaRequest<Location>, response: MedusaResponse) => {
    const { result } = await updateLocationWorkflow(request.scope).run({
        input: {
            customer_id: request.params.id,
            update: request.validatedBody,
        },
    });

    return response.json(result);
};
