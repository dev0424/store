import { MedusaRequest, MedusaResponse, validateAndTransformBody } from '@medusajs/framework';
import { MiddlewareRoute } from '@medusajs/medusa';
import { UpdateAccountStatusRequest } from './[id]/account-status/validators';
import { UpdateBankAccount } from './[id]/bank-account/validators';
import { UpdateAccountGroupRequest } from './[id]/account-group/validators';
import { UpdateCustomerProfileRequest } from './[id]/customer-profile/validators';
import { UpdateLocationRequest } from 'api/admin/customer/[id]/location/validators';
import { MedusaNextFunction } from '@medusajs/framework/http';

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
    {
        matcher: '/admin/customers/:id',
        middlewares: [
            (request: MedusaRequest, response: MedusaResponse, next: MedusaNextFunction) => {
                (request.allowed ??= []).push(
                    'bank_account',
                    'customer_profile',
                    'account_status',
                    'location',
                    'documents',
                    'account_group',
                    'contacts',
                );
                next();
            },
        ],
    },
    {
        matcher: '/admin/customers/:id/addresses',
        middlewares: [
            (request: MedusaRequest, response: MedusaResponse, next: MedusaNextFunction) => {
                (request.allowed ??= []).push(
                    'id',
                    'company',
                    'customer_id',
                    'first_name',
                    'last_name',
                    'address_1',
                    'address_2',
                    'address_name',
                    'city',
                    'province',
                    'postal_code',
                    'country_code',
                    'phone',
                    'metadata',
                    'is_default_shipping',
                    'is_default_billing',
                    'created_at',
                    'updated_at',
                );
                next();
            },
        ],
    },
];
