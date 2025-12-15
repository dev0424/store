import { model } from '@medusajs/framework/utils';

export const AccountGroup = model.define('account_group', {
    id: model.id().primaryKey(),
    is_centralized_billing: model.boolean(),
    corporate_status: model.enum(['subsidiary', 'independent']),
    is_purchasing_group_member: model.boolean(),
    purchasing_group_name: model.text().nullable(),
    membership_number: model.text().nullable(),
    is_agency_or_branch: model.boolean(),
    parent_group_name: model.text().nullable(),
    is_platform_client: model.boolean(),
    platform_name: model.text().nullable(),
});
