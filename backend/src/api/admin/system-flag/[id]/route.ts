import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { SystemFlag } from '../../../../lib/types';
import { updateSystemFlagWorkflow } from '../../../../workflows/system-flag/update-system-flag';

export const PUT = async (request: MedusaRequest<SystemFlag>, response: MedusaResponse) => {
    const { result } = await updateSystemFlagWorkflow(request.scope).run({
        input: request.validatedBody,
    });

    response.json(result);
};
