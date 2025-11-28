import { MedusaService } from '@medusajs/framework/utils';
import { BillingCycle } from 'modules/billing-cycle/models/billing-cycle';

class BillingCycleModuleService extends MedusaService({
    BillingCycle,
}) {}

export default BillingCycleModuleService;
