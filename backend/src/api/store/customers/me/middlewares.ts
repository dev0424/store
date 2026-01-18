import { MiddlewareRoute } from '@medusajs/medusa';
import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
import { MedusaNextFunction } from '@medusajs/framework/http';

export const customerMiddlewares: MiddlewareRoute[] = [
    {
        // Medusa restricts API routes to be retrieved for some endpoints https://docs.medusajs.com/learn/fundamentals/api-routes/retrieve-custom-links#api-routes-that-restrict-retrievable-fields
        matcher: '/store/customers/me',
        middlewares: [
            (request: MedusaRequest, response: MedusaResponse, next: MedusaNextFunction) => {
                (request.allowed ??= []).push('bank_account', 'customer_profile', 'account_status');
                next();
            },
        ],
    },
    {
        matcher: '/store/customers/me/bank-account',
        methods: ['PATCH'],
    },
    {
        matcher: '/store/customers/me/customer-profile',
        methods: ['PATCH'],
    },
];
