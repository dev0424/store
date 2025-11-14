import {
    defineMiddlewares,
    authenticate,
    validateAndTransformBody,
    MedusaNextFunction,
} from '@medusajs/framework/http';
import { PostAdminCreateProductDocument } from 'api/admin/product-document/validators';
import { UpdateBankAccount } from 'api/admin/bank-account/validators';
import { z } from 'zod';
import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
import { UpdateAccountStatusRequest } from 'api/admin/customer/[id]/account-status/validators';

export default defineMiddlewares({
    routes: [
        {
            matcher: '/store/company*',
            middlewares: [authenticate('customer', ['bearer'], { allowUnregistered: true })],
        },
        {
            matcher: '/admin/product-document',
            method: 'POST',
            middlewares: [validateAndTransformBody(PostAdminCreateProductDocument)],
        },
        {
            matcher: '/admin/bank-account/:id',
            method: 'PUT',
            middlewares: [validateAndTransformBody(UpdateBankAccount)],
        },
        {
            matcher: '/admin/products',
            method: ['POST'],
            additionalDataValidator: {
                product_document_id: z.string().optional(),
            },
        },
        {
            matcher: '/admin/customer/:id/account-status',
            method: 'PUT',
            middlewares: [validateAndTransformBody(UpdateAccountStatusRequest)],
        },
        {
            // Medusa restricts API routes to be retrieved for some endpoints https://docs.medusajs.com/learn/fundamentals/api-routes/retrieve-custom-links#api-routes-that-restrict-retrievable-fields
            matcher: '/store/customers/me',
            middlewares: [
                (request: MedusaRequest, response: MedusaResponse, next: MedusaNextFunction) => {
                    (request.allowed ??= []).push(
                        'bank_account',
                        'billing_address',
                        'customer_profile',
                        'account_status',
                    );
                    next();
                },
            ],
        },
        {
            matcher: '/admin/customers/:id',
            middlewares: [
                (request: MedusaRequest, response: MedusaResponse, next: MedusaNextFunction) => {
                    (request.allowed ??= []).push(
                        'bank_account',
                        'billing_address',
                        'customer_profile',
                        'account_status',
                    );
                    next();
                },
            ],
        },
    ],
});
