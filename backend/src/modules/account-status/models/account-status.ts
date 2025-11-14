import { model } from '@medusajs/framework/utils';

export const AccountStatus = model.define('account_status', {
    id: model.id().primaryKey(),
    application_status: model.enum(['PENDING', 'APPROVED', 'DECLINED']),
    is_searchable: model.boolean(),
});
