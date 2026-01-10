import { MiddlewareRoute } from '@medusajs/medusa';
import { adminCustomerMiddlewares } from './customer/middlewares';
import { adminProductMiddlewares } from 'api/admin/products/middlewares';

export const adminMiddlewares: MiddlewareRoute[] = [
    ...adminCustomerMiddlewares,
    ...adminProductMiddlewares,
];
