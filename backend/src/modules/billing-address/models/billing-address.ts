import { model } from '@medusajs/framework/utils';

export const BillingAddress = model.define('billing_address', {
    id: model.id().primaryKey(),
    address_1: model.text(),
    address_2: model.text().nullable(),
    postal_code: model.text(),
    city: model.text(),
    country_code: model.text(),
    province: model.text().nullable(),
});
