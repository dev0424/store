import { MiddlewareRoute } from '@medusajs/medusa';
import { ordersMiddleware } from './order/middlewares';
import { registerMiddleware } from 'api/store/customers/registration/middlewares';
import { customerMiddlewares } from 'api/store/customers/me/middlewares';

export const storeMiddlewares: MiddlewareRoute[] = [
    ...ordersMiddleware,
    ...registerMiddleware,
    ...customerMiddlewares,
];
