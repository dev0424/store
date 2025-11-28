import { Module } from '@medusajs/framework/utils';
import BillingCycleModuleService from 'modules/billing-cycle/services/service';

export const BILLING_CYCLE_MODULE = 'billing_cycle';

export default Module(BILLING_CYCLE_MODULE, {
    service: BillingCycleModuleService,
});
