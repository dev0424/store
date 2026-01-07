import { MiddlewareRoute } from '@medusajs/medusa';
import { validateAndTransformBody } from '@medusajs/framework';
import { CreateProductDocumentRequest } from 'api/admin/products/validators';

export const productMiddlewares: MiddlewareRoute[] = [
    {
        methods: ['POST'],
        matcher: '/admin/products/:productId/documents/upload',
        middlewares: [validateAndTransformBody(CreateProductDocumentRequest)],
    },
];
