import { CartDTO } from '@medusajs/types';
import { CheckoutMode } from 'lib/types';
import { FREE_SHIPPING_MIN_TOTAL, STANDARD_PRODUCT_TYPE } from 'lib/constants';

/*
 * Determines which checkout workflow to use based on cart contents and cart value.
 * */
export const determineCheckoutMode = (cart: CartDTO): CheckoutMode => {
    const hasOnlyStandardProducts = cart.items?.every((item: any) => {
        return item.product_type === STANDARD_PRODUCT_TYPE;
    });

    const isEligibleForFreeShipping = +cart.item_subtotal.valueOf() >= FREE_SHIPPING_MIN_TOTAL;

    return hasOnlyStandardProducts && isEligibleForFreeShipping
        ? CheckoutMode.ORDER
        : CheckoutMode.QUOTE;
};
