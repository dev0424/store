import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { createBillingCycleWorkflow } from '../../../workflows/billing-cycle/create-billing-cycle';
import { BillingCycle } from 'lib/types';

export const POST = async (request: MedusaRequest<BillingCycle>, response: MedusaResponse) => {
    const { result } = await createBillingCycleWorkflow(request.scope).run({
        input: request.validatedBody,
    });

    return response.json(result);
};
