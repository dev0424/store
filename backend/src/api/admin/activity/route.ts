import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { createActivityWorkflow } from '../../../workflows/create-activity';
import { Activity } from '../../../lib/types';

export const POST = async (request: MedusaRequest<Activity>, response: MedusaResponse) => {
    const { result } = await createActivityWorkflow(request.scope).run({
        input: request.validatedBody,
    });

    return response.json(result);
};
