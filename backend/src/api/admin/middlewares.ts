import { MiddlewareRoute } from '@medusajs/medusa';
import { adminAccountStatusMiddlewares } from './customer/[id]/account-status/middlewares';
import { uploadMiddlewares } from 'api/admin/uploads/middlewares';

export const adminMiddlewares: MiddlewareRoute[] = [
    ...adminAccountStatusMiddlewares,
    ...uploadMiddlewares,
];
