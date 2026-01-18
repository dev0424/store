import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { SYSTEM_FLAG_MODULE } from '../../modules/system-flag';
import SystemFlagModuleService from '../../modules/system-flag/services/service';
import { SystemFlag } from '../../lib/types';

const createSystemFlagStep = createStep(
    'create-system-flag',
    async (input: SystemFlag, { container }) => {
        const systemFlagService: SystemFlagModuleService = container.resolve(SYSTEM_FLAG_MODULE);

        const systemFlag = await systemFlagService.createSystemFlags(input);

        return new StepResponse(systemFlag, systemFlag.id);
    },

    // Compensation function
    async (id, { container }) => {
        const systemFlagModuleService: SystemFlagModuleService =
            container.resolve(SYSTEM_FLAG_MODULE);

        await systemFlagModuleService.deleteSystemFlags(id);
    },
);

export const createSystemFlagWorkflow = createWorkflow<SystemFlag, any, any>(
    'create-system-flag-workflow',
    (input: SystemFlag) => {
        const systemFlag = createSystemFlagStep(input);

        return new WorkflowResponse({ system_flag: systemFlag });
    },
);
