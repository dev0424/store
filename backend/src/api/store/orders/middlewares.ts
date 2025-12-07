import { validateAndTransformBody, validateAndTransformQuery } from '@medusajs/framework';
import { MiddlewareRoute } from '@medusajs/medusa';
import { CheckoutCartRequest, GetOrderParams, GetOrdersParams } from './validators';
import { getOrdersQueryConfig, getOrderQueryConfig } from './query-config';

export const ordersMiddleware: MiddlewareRoute[] = [
    {
        matcher: '/store/orders',
        methods: ['GET'],
        middlewares: [validateAndTransformQuery(GetOrdersParams, getOrdersQueryConfig)],
    },
    {
        matcher: '/store/orders/:id',
        methods: ['GET'],
        middlewares: [validateAndTransformQuery(GetOrderParams, getOrderQueryConfig)],
    },
    {
        matcher: '/store/orders',
        methods: ['POST'],
        middlewares: [validateAndTransformBody(CheckoutCartRequest)],
    },
];
