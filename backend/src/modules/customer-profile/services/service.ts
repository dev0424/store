import { MedusaService } from '@medusajs/framework/utils';
import { CustomerProfile } from 'modules/customer-profile/models/customer-profile';

class CustomerProfileModuleService extends MedusaService({
    CustomerProfile,
}) {}

export default CustomerProfileModuleService;
