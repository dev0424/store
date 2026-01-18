import { validateAndTransformBody } from '@medusajs/framework';
import { MiddlewareRoute } from '@medusajs/medusa';
import { UpdateAccountStatusRequest } from './[id]/account-status/validators';
import { UpdateBankAccount } from './[id]/bank-account/validators';
import { UpdateAccountGroupRequest } from './[id]/account-group/validators';
import { UpdateCustomerProfileRequest } from './[id]/customer-profile/validators';
import { UpdateLocationRequest } from 'api/admin/customer/[id]/location/validators';

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
    {
        matcher: '/admin/customer/:id/customer-profile',
        methods: ['PUT'],
        middlewares: [validateAndTransformBody(UpdateCustomerProfileRequest)],
    },
    {
        matcher: '/admin/customer/:id/location',
        methods: ['PUT'],
        middlewares: [validateAndTransformBody(UpdateLocationRequest)],
    },
];
