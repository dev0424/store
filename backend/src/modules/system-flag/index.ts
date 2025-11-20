import { Module } from '@medusajs/framework/utils';
import SystemFlagModuleService from 'modules/system-flag/services/service';

export const SYSTEM_FLAG_MODULE = 'system_flag';

export default Module(SYSTEM_FLAG_MODULE, {
    service: SystemFlagModuleService,
});
