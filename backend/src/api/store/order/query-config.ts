export const fields = [
    'id',
    'display_id',
    'status',
    'fulfillment_status',
    'payment_status',
    'currency_code',
    'is_draft_order',
    'created_at',
    'email',

    // order totals
    'total',
    'subtotal',
    'tax_total',
    'original_total',
    'original_subtotal',
    'original_tax_total',
    'discount_total',
    'discount_tax_total',
    'shipping_total',
    'shipping_subtotal',
    'shipping_tax_total',
    'original_shipping_total',
    'original_shipping_subtotal',
    'original_shipping_tax_total',
    'item_total',
    'item_tax_total',
    'item_subtotal',
    'original_item_total',
    'original_item_tax_total',
    'original_item_subtotal',
    'gift_card_total',
    'gift_card_tax_total',

    // relations:
    'items.*',
    'items.variant',
    'items.product',
    'shipping_address.*',
    'shipping_methods.*',
    'payment_collections.payments',
];

export const getOrderQueryConfig = {
    defaults: fields,
    isList: false,
};

export const getOrdersQueryConfig = {
    defaults: fields,
    isList: false,
};
