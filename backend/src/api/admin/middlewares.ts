import { MiddlewareRoute } from '@medusajs/medusa';
import { adminCustomerMiddlewares } from './customer/middlewares';
import { adminProductMiddlewares } from 'api/admin/products/middlewares';
import { validateAndTransformBody } from '@medusajs/framework/http';
import { CreateActivityRequest } from 'api/admin/activities/validators';
import { CreateCustomPaymentMethodRequest } from 'api/admin/custom-payment-methods/validators';
import { CreateBillingCycleRequest } from 'api/admin/billing-cycles/validators';

export const adminMiddlewares: MiddlewareRoute[] = [
    ...adminCustomerMiddlewares,
    ...adminProductMiddlewares,
    {
        matcher: '/admin/activities',
        methods: ['POST'],
        middlewares: [validateAndTransformBody(CreateActivityRequest)],
    },
    {
        matcher: '/admin/custom-payment-methods',
        methods: ['POST'],
        middlewares: [validateAndTransformBody(CreateCustomPaymentMethodRequest)],
    },
    {
        matcher: '/admin/billing-cycles',
        methods: ['POST'],
        middlewares: [validateAndTransformBody(CreateBillingCycleRequest)],
    },
];
