import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { getSystemFlagsWorkflow } from '../../../workflows/get-system-flags';
import { createSystemFlagWorkflow } from '../../../workflows/create-system-flag';
import { SystemFlag } from '../../../lib/types';

export const GET = async (request: MedusaRequest, response: MedusaResponse) => {
    const { result } = await getSystemFlagsWorkflow(request.scope).run({});

    response.json(result);
};

export const POST = async (request: MedusaRequest<SystemFlag>, response: MedusaResponse) => {
    const { result } = await createSystemFlagWorkflow(request.scope).run({
        input: request.validatedBody,
    });

    response.json(result);
};
