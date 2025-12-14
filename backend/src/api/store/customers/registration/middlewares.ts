import { MiddlewareRoute } from '@medusajs/medusa';
import { authenticate } from '@medusajs/framework/http';

export const registerMiddleware: MiddlewareRoute[] = [
    {
        matcher: '/store/customers/registration',
        methods: ['POST'],
        middlewares: [authenticate('customer', ['bearer'], { allowUnregistered: true })],
    },
];
