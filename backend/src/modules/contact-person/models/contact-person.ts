import { model } from '@medusajs/framework/utils';

export const ContactPerson = model.define('contact_person', {
    id: model.id().primaryKey(),
    title: model.text(),
    first_name: model.text(),
    last_name: model.text(),
    role: model.text(),
    phone: model.text(),
    email: model.text(),
});
