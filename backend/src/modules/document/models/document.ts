import { model } from '@medusajs/framework/utils';

export const Document = model.define('document', {
    id: model.id().primaryKey(),
    url: model.text(),
    type: model.text(),
    name: model.text().nullable(),
    mime_type: model.text().nullable(),
    size: model.number().nullable(),
});
