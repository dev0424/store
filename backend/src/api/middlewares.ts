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
import { UpdateAccountStatusRequest } from 'api/admin/account-status/validators';
import { UpdateCustomerProfileRequest } from 'api/admin/customer-profile/validators';

export default defineMiddlewares({
    routes: [
        {
            matcher: '/store/register*',
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
            matcher: '/admin/account-status/:id',
            method: 'PUT',
            middlewares: [validateAndTransformBody(UpdateAccountStatusRequest)],
        },
        {
            matcher: '/admin/customer-profile/:id',
            method: 'PUT',
            middlewares: [validateAndTransformBody(UpdateCustomerProfileRequest)],
        },
        {
            // Medusa restricts API routes to be retrieved for some endpoints https://docs.medusajs.com/learn/fundamentals/api-routes/retrieve-custom-links#api-routes-that-restrict-retrievable-fields
            matcher: '/store/customers/me',
            middlewares: [
                (request: MedusaRequest, response: MedusaResponse, next: MedusaNextFunction) => {
                    (request.allowed ??= []).push(
                        'bank_account',
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
                        'customer_profile',
                        'account_status',
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
    ],
});
