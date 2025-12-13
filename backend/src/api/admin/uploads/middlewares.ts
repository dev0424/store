import { MiddlewareRoute } from '@medusajs/medusa';

export const uploadMiddlewares: MiddlewareRoute[] = [
    {
        methods: ['POST'],
        matcher: '/admin/uploads',
    },
];
