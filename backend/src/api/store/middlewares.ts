import { MiddlewareRoute } from '@medusajs/medusa';
import { ordersMiddleware } from './order/middlewares';

export const storeMiddlewares: MiddlewareRoute[] = [...ordersMiddleware];
