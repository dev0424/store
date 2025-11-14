import { MedusaService } from '@medusajs/framework/utils';
import { AccountStatus } from 'modules/account-status/models/account-status';

class AccountStatusModuleService extends MedusaService({
    AccountStatus,
}) {}

export default AccountStatusModuleService;
