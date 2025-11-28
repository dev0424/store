import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
import { getBillingCyclesWorkflow } from '../../../workflows/billing-cycle/get-billing-cycles';

export const GET = async (request: MedusaRequest, response: MedusaResponse) => {
    const { result } = await getBillingCyclesWorkflow(request.scope).run();

    response.json(result);
};
