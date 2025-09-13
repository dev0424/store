import { model } from '@medusajs/framework/utils';

export const ProductDocument = model.define('product_document', {
    id: model.id().primaryKey(),
    url: model.text(),
    type: model.text(),
    name: model.text().nullable(),
});
