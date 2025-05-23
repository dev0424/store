import { defineMiddlewares, authenticate } from '@medusajs/framework/http';

export default defineMiddlewares({
    routes: [
        {
            matcher: '/store/company*',
            middlewares: [authenticate('customer', ['bearer'], { allowUnregistered: true })],
        },
    ],
});
