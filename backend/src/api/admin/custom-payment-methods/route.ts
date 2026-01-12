import { MedusaResponse, AuthenticatedMedusaRequest } from '@medusajs/framework/http';
import { createCustomPaymentMethodWorkflow } from '../../../workflows/custom-payment-method/create-custom-payment-method';
import { CustomPaymentMethod } from 'lib/types';
import { getCustomPaymentMethodsWorkflow } from '../../../workflows/custom-payment-method/get-custom-payment-methods';

export const GET = async (request: AuthenticatedMedusaRequest, response: MedusaResponse) => {
    const { result } = await getCustomPaymentMethodsWorkflow(request.scope).run();

    response.json(result);
};

export const POST = async (
    request: AuthenticatedMedusaRequest<CustomPaymentMethod>,
    response: MedusaResponse,
) => {
    const { result } = await createCustomPaymentMethodWorkflow(request.scope).run({
        input: request.validatedBody,
    });

    return response.json(result);
};
