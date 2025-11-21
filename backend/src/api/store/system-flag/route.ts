import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { getSystemFlagsWorkflow } from '../../../workflows/get-system-flags';

export const GET = async (request: MedusaRequest, response: MedusaResponse) => {
    const { result } = await getSystemFlagsWorkflow(request.scope).run({});

    response.json(result);
};
