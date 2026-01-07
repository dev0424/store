import { MiddlewareRoute } from '@medusajs/medusa';
import { adminAccountStatusMiddlewares } from './customer/[id]/account-status/middlewares';
import { productMiddlewares } from 'api/admin/products/middlewares';

export const adminMiddlewares: MiddlewareRoute[] = [
    ...adminAccountStatusMiddlewares,
    ...productMiddlewares,
];
