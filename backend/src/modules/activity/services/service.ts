import { MedusaService } from '@medusajs/framework/utils';
import { Activity } from 'modules/activity/models/activity';

class ActivityModuleService extends MedusaService({
    Activity,
}) {}

export default ActivityModuleService;
