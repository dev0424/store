import { model } from '@medusajs/framework/utils';

export const CustomPaymentMethod = model.define('custom_payment_method', {
    id: model.id().primaryKey(),
    name: model.text(),
});
