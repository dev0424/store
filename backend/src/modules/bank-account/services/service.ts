import { MedusaService } from '@medusajs/framework/utils';
import { BankAccount } from 'modules/bank-account/models/bank-account';

class BankAccountModuleService extends MedusaService({
    BankAccount,
}) {}

export default BankAccountModuleService;
