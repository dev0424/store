import { Module } from '@medusajs/framework/utils';
import ActivityModuleService from 'modules/activity/services/service';

export const ACTIVITY_MODULE = 'activity';

export default Module(ACTIVITY_MODULE, {
    service: ActivityModuleService,
});
