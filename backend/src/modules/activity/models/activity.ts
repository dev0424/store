import { model } from '@medusajs/framework/utils';

export const Activity = model.define('activity', {
    id: model.id().primaryKey(),
    name: model.text(),
});
