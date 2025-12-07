export const cartFields = [
    'id',
    'sales_channel_id',
    'currency_code',
    'region_id',
    'customer.id',
    'customer.email',
    'shipping_address.*',
    'billing_address.*',
    'item_subtotal',
    'items.*',
    'items.product.*',
    'items.product.shipping_profile.*',
    'shipping_methods.*',
    'promotions.code',
];

export const customerFields = ['id', 'email'];
