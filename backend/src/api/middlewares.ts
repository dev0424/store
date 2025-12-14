import {
    defineMiddlewares,
    validateAndTransformBody,
    MedusaNextFunction,
} from '@medusajs/framework/http';
import { PostAdminCreateProductDocument } from 'api/admin/product-document/validators';
import { UpdateBankAccount } from 'api/admin/bank-account/validators';
import { z } from 'zod';
import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
import { UpdateCustomerProfileRequest } from 'api/admin/customer-profile/validators';
import { UpdateLocationRequest } from 'api/admin/location/validators';
import { CreateSystemFlagRequest, UpdateSystemFlagRequest } from 'api/admin/system-flag/validators';
import { ContactFormRequest } from 'api/store/contact/validators';
import { CreateActivityRequest } from 'api/admin/activity/validators';
import { CreateCustomPaymentMethodRequest } from 'api/admin/custom-payment-method/validators';
import { CreateBillingCycleRequest } from 'api/admin/billing-cycle/validators';
import { adminMiddlewares } from './admin/middlewares';
import { storeMiddlewares } from './store/middlewares';

export default defineMiddlewares({
    routes: [
        ...adminMiddlewares,
        ...storeMiddlewares,
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
            matcher: '/admin/customer-profile/:id',
            method: 'PUT',
            middlewares: [validateAndTransformBody(UpdateCustomerProfileRequest)],
        },
        {
            matcher: '/admin/location/:id',
            method: 'PUT',
            middlewares: [validateAndTransformBody(UpdateLocationRequest)],
        },
        {
            matcher: '/admin/system-flag',
            method: 'POST',
            middlewares: [validateAndTransformBody(CreateSystemFlagRequest)],
        },
        {
            matcher: '/admin/system-flag/:id',
            method: 'PUT',
            middlewares: [validateAndTransformBody(UpdateSystemFlagRequest)],
        },
        {
            matcher: '/admin/activity',
            method: 'POST',
            middlewares: [validateAndTransformBody(CreateActivityRequest)],
        },
        {
            matcher: '/admin/custom-payment-method',
            method: 'POST',
            middlewares: [validateAndTransformBody(CreateCustomPaymentMethodRequest)],
        },
        {
            matcher: '/admin/billing-cycle',
            method: 'POST',
            middlewares: [validateAndTransformBody(CreateBillingCycleRequest)],
        },
        {
            matcher: '/store/contact',
            method: 'POST',
            middlewares: [validateAndTransformBody(ContactFormRequest)],
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
                        'location',
                        'documents',
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
