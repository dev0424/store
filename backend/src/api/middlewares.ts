import {
    defineMiddlewares,
    authenticate,
    validateAndTransformBody,
    MedusaNextFunction,
} from '@medusajs/framework/http';
import { PostAdminCreateProductDocument } from 'api/admin/product-document/validators';
import { z } from 'zod';
import { MedusaRequest, MedusaResponse } from '@medusajs/framework';

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
            matcher: '/admin/products',
            method: ['POST'],
            additionalDataValidator: {
                product_document_id: z.string().optional(),
            },
        },
        {
            // Medusa restricts API routes to be retrieved for some endpoints https://docs.medusajs.com/learn/fundamentals/api-routes/retrieve-custom-links#api-routes-that-restrict-retrievable-fields
            matcher: '/store/customers/me',
            middlewares: [
                (request: MedusaRequest, response: MedusaResponse, next: MedusaNextFunction) => {
                    (request.allowed ??= []).push('bank_account');
                    next();
                },
            ],
        },
    ],
});
