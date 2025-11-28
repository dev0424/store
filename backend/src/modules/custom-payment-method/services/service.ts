import { MedusaService } from '@medusajs/framework/utils';
import { CustomPaymentMethod } from 'modules/custom-payment-method/models/custom-payment-method';

class CustomPaymentMethodModuleService extends MedusaService({
    CustomPaymentMethod,
}) {}

export default CustomPaymentMethodModuleService;
