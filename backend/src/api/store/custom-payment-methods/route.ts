import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
import { getCustomPaymentMethodsWorkflow } from '../../../workflows/custom-payment-method/get-custom-payment-methods';

export const GET = async (request: MedusaRequest, response: MedusaResponse) => {
    const { result } = await getCustomPaymentMethodsWorkflow(request.scope).run();

    response.json(result);
};
