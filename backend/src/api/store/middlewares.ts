import { MiddlewareRoute } from '@medusajs/medusa';
import { ordersMiddleware } from './order/middlewares';
import { registerMiddleware } from 'api/store/customers/registration/middlewares';
import { customerMiddlewares } from 'api/store/customers/me/middlewares';
import { validateAndTransformBody } from '@medusajs/framework/http';
import { ContactFormRequest } from 'api/store/contact/validators';

export const storeMiddlewares: MiddlewareRoute[] = [
    ...ordersMiddleware,
    ...registerMiddleware,
    ...customerMiddlewares,
    {
        matcher: '/store/contact',
        methods: ['POST'],
        middlewares: [validateAndTransformBody(ContactFormRequest)],
    },
];
