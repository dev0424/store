import { Module } from '@medusajs/framework/utils';
import AccountGroupModuleService from 'modules/account-group/services/service';

export const ACCOUNT_GROUP_MODULE = 'account_group';

export default Module(ACCOUNT_GROUP_MODULE, {
    service: AccountGroupModuleService,
});
