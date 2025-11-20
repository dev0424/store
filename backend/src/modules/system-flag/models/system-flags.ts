import { model } from '@medusajs/framework/utils';

export const SystemFlag = model.define('system_flag', {
    id: model.id().primaryKey(),
    key: model.text(),
    value: model.text(),
    name: model.text(),
});
