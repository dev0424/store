import { MedusaResponse, AuthenticatedMedusaRequest } from '@medusajs/framework/http';
import { createBillingCycleWorkflow } from '../../../workflows/billing-cycle/create-billing-cycle';
import { BillingCycle } from 'lib/types';
import { getBillingCyclesWorkflow } from '../../../workflows/billing-cycle/get-billing-cycles';

export const GET = async (request: AuthenticatedMedusaRequest, response: MedusaResponse) => {
    const { result } = await getBillingCyclesWorkflow(request.scope).run();

    response.json(result);
};

export const POST = async (
    request: AuthenticatedMedusaRequest<BillingCycle>,
    response: MedusaResponse,
) => {
    const { result } = await createBillingCycleWorkflow(request.scope).run({
        input: request.validatedBody,
    });

    return response.json(result);
};
