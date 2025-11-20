import { MedusaService } from '@medusajs/framework/utils';
import { SystemFlag } from 'modules/system-flag/models/system-flags';

class SystemFlagModuleService extends MedusaService({
    SystemFlag,
}) {}

export default SystemFlagModuleService;
