import {
    defineMiddlewares,
    authenticate,
    validateAndTransformBody,
} from '@medusajs/framework/http';
import { PostAdminCreateProductDocument } from 'api/admin/product-document/validators';
import { z } from 'zod';

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
    ],
});
