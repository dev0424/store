import { Module } from '@medusajs/framework/utils';
import BillingAddressModuleService from 'modules/billing-address/services/service';

export const BILLING_ADDRESS_MODULE = 'billing_address';

export default Module(BILLING_ADDRESS_MODULE, {
    service: BillingAddressModuleService,
});
