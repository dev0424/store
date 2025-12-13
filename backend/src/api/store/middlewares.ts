import { MiddlewareRoute } from '@medusajs/medusa';
import { ordersMiddleware } from './order/middlewares';
import { registerMiddleware } from 'api/store/register/middlewares';
import { customersMiddleware } from 'api/store/customers/me/middlewares';

export const storeMiddlewares: MiddlewareRoute[] = [
    ...ordersMiddleware,
    ...registerMiddleware,
    ...customersMiddleware,
];
