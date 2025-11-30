import { validateAndTransformBody } from '@medusajs/framework';
import { MiddlewareRoute } from '@medusajs/medusa';
import { UpdateAccountStatusRequest } from './validators';

export const adminAccountStatusMiddlewares: MiddlewareRoute[] = [
    {
        matcher: '/admin/customer/:id/account-status',
        methods: ['PUT'],
        middlewares: [validateAndTransformBody(UpdateAccountStatusRequest)],
    },
];
