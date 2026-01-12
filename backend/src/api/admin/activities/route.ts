import { MedusaResponse, AuthenticatedMedusaRequest } from '@medusajs/framework/http';
import { createActivityWorkflow } from '../../../workflows/activity/create-activity';
import { Activity } from '../../../lib/types';
import { getActivitiesWorkflow } from '../../../workflows/activity/get-activities';

export const GET = async (request: AuthenticatedMedusaRequest, response: MedusaResponse) => {
    const { result } = await getActivitiesWorkflow(request.scope).run();

    response.json(result);
};

export const POST = async (
    request: AuthenticatedMedusaRequest<Activity>,
    response: MedusaResponse,
) => {
    const { result } = await createActivityWorkflow(request.scope).run({
        input: request.validatedBody,
    });

    return response.json(result);
};
