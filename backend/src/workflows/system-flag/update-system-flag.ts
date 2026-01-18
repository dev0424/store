import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { SYSTEM_FLAG_MODULE } from '../../modules/system-flag';
import { SystemFlag } from '../../lib/types';
import SystemFlagModuleService from '../../modules/system-flag/services/service';

export const updateSystemFlagStep = createStep(
    'update-system-flag-step',
    async (input: SystemFlag, { container }) => {
        const systemFlagModuleService: SystemFlagModuleService =
            container.resolve(SYSTEM_FLAG_MODULE);

        // Retrieve the original system flag for compensation
        const original = await systemFlagModuleService.retrieveSystemFlag(input.id);
        const updated = await systemFlagModuleService.updateSystemFlags(input);

        return new StepResponse(updated, original);
    },

    // Compensation function
    async (original, { container }) => {
        if (!original) {
            return;
        }

        const systemFlagModuleService: SystemFlagModuleService =
            container.resolve(SYSTEM_FLAG_MODULE);

        await systemFlagModuleService.updateSystemFlags(original);
    },
);

export const updateSystemFlagWorkflow = createWorkflow(
    'update-system-flag',
    (systemFlag: SystemFlag) => {
        const updatedSystemFlag = updateSystemFlagStep(systemFlag);

        return new WorkflowResponse(updatedSystemFlag);
    },
);
