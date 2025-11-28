import { model } from '@medusajs/framework/utils';

export const Location = model.define('location', {
    id: model.id().primaryKey(),
    latitude: model.float().nullable(),
    longitude: model.float().nullable(),
    address_1: model.text().nullable(),
    address_2: model.text().nullable(),
    city: model.text().nullable(),
    country_code: model.text().nullable(),
    province: model.text().nullable(),
    postal_code: model.text().nullable(),
    phone: model.text().nullable(),
    email: model.text().nullable(),
});
