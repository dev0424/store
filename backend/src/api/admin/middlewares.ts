import { MiddlewareRoute } from '@medusajs/medusa';
import { adminAccountStatusMiddlewares } from './customer/[id]/account-status/middlewares';

export const adminMiddlewares: MiddlewareRoute[] = [...adminAccountStatusMiddlewares];
