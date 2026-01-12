import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
import { getActivitiesWorkflow } from '../../../workflows/activity/get-activities';

export const GET = async (request: MedusaRequest, response: MedusaResponse) => {
    const { result } = await getActivitiesWorkflow(request.scope).run();

    response.json(result);
};
