import { Module } from '@medusajs/framework/utils';
import AccountStatusModuleService from 'modules/account-status/services/service';

export const ACCOUNT_STATUS_MODULE = 'account_status';

export default Module(ACCOUNT_STATUS_MODULE, {
    service: AccountStatusModuleService,
});
