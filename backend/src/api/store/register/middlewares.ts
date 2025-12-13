import { MiddlewareRoute } from '@medusajs/medusa';
import { authenticate } from '@medusajs/framework/http';

export const registerMiddleware: MiddlewareRoute[] = [
    {
        matcher: '/store/register',
        methods: ['POST'],
        middlewares: [authenticate('customer', ['bearer'], { allowUnregistered: true })],
    },
];
