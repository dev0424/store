import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { createCustomPaymentMethodWorkflow } from '../../../workflows/custom-payment-method/create-custom-payment-method';
import { CustomPaymentMethod } from 'lib/types';

export const POST = async (
    request: MedusaRequest<CustomPaymentMethod>,
    response: MedusaResponse,
) => {
    const { result } = await createCustomPaymentMethodWorkflow(request.scope).run({
        input: request.validatedBody,
    });

    return response.json(result);
};
