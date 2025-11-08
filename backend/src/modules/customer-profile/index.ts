import { Module } from '@medusajs/framework/utils';
import CustomerProfileModuleService from 'modules/customer-profile/services/service';

export const CUSTOMER_PROFILE_MODULE = 'customer_profile';

export default Module(CUSTOMER_PROFILE_MODULE, {
    service: CustomerProfileModuleService,
});
