import { validateAndTransformBody } from '@medusajs/framework';
import { MiddlewareRoute } from '@medusajs/medusa';
import { UpdateAccountStatusRequest } from './[id]/account-status/validators';
import { UpdateBankAccount } from './[id]/bank-account/validators';
import { UpdateAccountGroupRequest } from './[id]/account-group/validators';

export const adminCustomerMiddlewares: MiddlewareRoute[] = [
    {
        matcher: '/admin/customer/:id/account-status',
        methods: ['PUT'],
        middlewares: [validateAndTransformBody(UpdateAccountStatusRequest)],
    },
    {
        matcher: '/admin/customer/:id/bank-account',
        methods: ['PUT'],
        middlewares: [validateAndTransformBody(UpdateBankAccount)],
    },
    {
        matcher: '/admin/customer/:id/account-group',
        methods: ['PUT'],
        middlewares: [validateAndTransformBody(UpdateAccountGroupRequest)],
    },
];
