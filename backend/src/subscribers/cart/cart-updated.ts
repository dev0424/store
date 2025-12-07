import type { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
import { Modules } from '@medusajs/framework/utils';
import { determineCheckoutMode } from '../../lib/cart';
import { fields } from './query-config';

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
