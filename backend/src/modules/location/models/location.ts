import { model } from '@medusajs/framework/utils';

export const Location = model.define('location', {
    id: model.id().primaryKey(),
    latitude: model.number().nullable(),
    longitude: model.number().nullable(),
});
