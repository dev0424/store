import { model } from '@medusajs/framework/utils';

export const Contact = model.define('contact', {
    id: model.id().primaryKey(),
    title: model.text(),
    first_name: model.text(),
    last_name: model.text(),
    role: model.text(),
    phone: model.text(),
    email: model.text(),
});
