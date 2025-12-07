export const fields = [
    'id',
    'currency_code',

    // cart-level totals
    'total',
    'subtotal',
    'tax_total',
    'discount_total',
    'shipping_total',

    // product-level totals
    'item_total',
    'item_subtotal',
    'item_tax_total',
    'original_total',
    'original_subtotal',
    'original_tax_total',
    'shipping_subtotal',
    'shipping_tax_total',

    // relations
    'items.*',
    'items.product.*',
    'items.product.shipping_profile.*',
    'shipping_methods.*',
];
