import {
    createWorkflow,
    WorkflowResponse,
    createStep,
    StepResponse,
} from '@medusajs/framework/workflows-sdk';
import SystemFlagModuleService from '../modules/system-flag/services/service';
import { SYSTEM_FLAG_MODULE } from '../modules/system-flag/index';
import { SystemFlag } from '../lib/types';

const getSystemFlagsStep = createStep('get-system-flags', async (_input, { container }) => {
    const systemFlagModuleService: SystemFlagModuleService = container.resolve(SYSTEM_FLAG_MODULE);
    const flags = await systemFlagModuleService.listSystemFlags({});

    return new StepResponse(flags);
});

export const getSystemFlagsWorkflow = createWorkflow<SystemFlag, any, any>(
    'get-system-flags-workflow',
    () => {
        const flags = getSystemFlagsStep();

        return new WorkflowResponse({ system_flags: flags });
    },
);
