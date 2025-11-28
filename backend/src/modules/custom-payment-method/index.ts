import { Module } from '@medusajs/framework/utils';
import CustomPaymentMethodModuleService from 'modules/custom-payment-method/services/service';

export const CUSTOM_PAYMENT_METHOD_MODULE = 'custom_payment_method';

export default Module(CUSTOM_PAYMENT_METHOD_MODULE, {
    service: CustomPaymentMethodModuleService,
});
