import { MedusaService } from '@medusajs/framework/utils';
import { AccountGroup } from 'modules/account-group/models/account-group';

class AccountGroupModuleService extends MedusaService({
    AccountGroup,
}) {}

export default AccountGroupModuleService;
