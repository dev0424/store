import { MiddlewareRoute } from '@medusajs/medusa';
import { validateAndTransformBody } from '@medusajs/framework';
import { CreateProductDocumentRequest } from 'api/admin/products/validators';
import { z } from 'zod';

export const adminProductMiddlewares: MiddlewareRoute[] = [
    {
        matcher: '/admin/products',
        methods: ['POST'],
        additionalDataValidator: {
            product_document_id: z.string().optional(),
        },
    },
    {
        methods: ['POST'],
        matcher: '/admin/products/:productId/documents/upload',
        middlewares: [validateAndTransformBody(CreateProductDocumentRequest)],
    },
];
