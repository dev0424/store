import type { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
import { Modules } from '@medusajs/framework/utils';
import { determineCheckoutMode } from '../../lib/cart';
import { fields } from './query-config';

/*
* Subscriber that keeps a cart's `checkout_mode` metadata in sync whenever the cart is updated:
1. Listens to the `cart.updated` event via the exported `config`.
2. Uses the Medusa container's `query` to load the full cart by ID with a shared `fields` config.
3. Derives the checkout mode from the loaded cart using `determineCheckoutMode`.
4. Updates the cart via the Cart Module to persist the computed `checkout_mode` in `cart.metadata`.
*/
export default async function cartUpdatedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }>) {
    const cartId = data.id;
    const cartModule = container.resolve(Modules.CART);

    const query = container.resolve('query');

    const { data: carts } = await query.graph({
        entity: 'cart',
        fields,
        filters: { id: cartId },
    });

    const cart = carts[0];

    const checkoutMode = determineCheckoutMode(cart);

    await cartModule.updateCarts([
        {
            id: cart.id,
            metadata: {
                ...cart.metadata,
                checkout_mode: checkoutMode,
            },
        },
    ]);
}

export const config: SubscriberConfig = {
    event: 'cart.updated',
};
