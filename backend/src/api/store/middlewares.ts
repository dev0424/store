import { MiddlewareRoute } from '@medusajs/medusa';
import { ordersMiddleware } from './orders/middlewares';

export const storeMiddlewares: MiddlewareRoute[] = [...ordersMiddleware];
