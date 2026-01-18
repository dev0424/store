import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';

export const getPriceRangeStep = createStep(
    'get-price-range',
    async ({ category_ids }: { category_ids: string[] }, { container }) => {
        const query = container.resolve('query');

        // Fetch products with their variants and prices filtered by category_ids
        const { data: products } = await query.graph({
            entity: 'product',
            fields: ['id', 'variants.id', 'variants.prices.amount'],
            filters: {
                categories: category_ids,
            },
        });

        let prices: number[] = [];

        // Aggregate all prices
        for (const product of products) {
            for (const variant of product.variants ?? []) {
                for (const price of variant.prices ?? []) {
                    prices.push(price.amount);
                }
            }
        }

        const min_price = prices.length ? Math.min(...prices) : null;
        const max_price = prices.length ? Math.max(...prices) : null;

        return new StepResponse({ min_price, max_price });
    },
);

export const getPriceRangeWorkflow = createWorkflow(
    'get-price-range-workflow',
    (input: { category_ids: string[] }) => {
        const { min_price, max_price } = getPriceRangeStep({ category_ids: input.category_ids });
        return new WorkflowResponse({ min_price, max_price });
    },
);
