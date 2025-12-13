import { MiddlewareRoute } from '@medusajs/medusa';
import { ordersMiddleware } from './order/middlewares';
import { registerMiddleware } from 'api/store/register/middlewares';

export const storeMiddlewares: MiddlewareRoute[] = [...ordersMiddleware, ...registerMiddleware];
