import { MedusaService } from '@medusajs/framework/utils';
import { BillingAddress } from 'modules/billing-address/models/billing-address';

class BillingAddressModuleService extends MedusaService({
    BillingAddress,
}) {}

export default BillingAddressModuleService;
