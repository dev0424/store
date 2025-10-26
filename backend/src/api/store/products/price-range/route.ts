import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
import { getPriceRangeWorkflow } from '../../../../workflows/get-price-range';

export const GET = async (request: MedusaRequest, response: MedusaResponse) => {
    const category_ids = Array.isArray(request.query.category_ids)
        ? request.query.category_ids
        : [request.query.category_ids];

    const { result } = await getPriceRangeWorkflow(request.scope).run({
        // @ts-ignore
        input: { category_ids },
    });

    response.json(result);
};
