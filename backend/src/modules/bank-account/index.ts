import { Module } from '@medusajs/framework/utils';
import BankAccountModuleService from 'modules/bank-account/services/service';

export const BANK_ACCOUNT_MODULE = 'bank_account';

export default Module(BANK_ACCOUNT_MODULE, {
    service: BankAccountModuleService,
});
