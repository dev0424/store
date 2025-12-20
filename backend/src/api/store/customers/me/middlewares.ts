import { MiddlewareRoute } from '@medusajs/medusa';

export const customerMiddlewares: MiddlewareRoute[] = [
    {
        matcher: '/store/customers/me/bank-account',
        methods: ['PATCH'],
    },
];
