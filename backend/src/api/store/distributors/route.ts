import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
import { getDistributors } from '../../../workflows/get-distributors';

export const GET = async (request: MedusaRequest, response: MedusaResponse) => {
    const { result } = await getDistributors(request.scope).run();

    response.json(result);
};
