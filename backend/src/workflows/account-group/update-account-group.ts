import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { AccountGroup } from 'lib/types';
import AccountGroupModuleService from 'modules/account-group/services/service';
import { ACCOUNT_GROUP_MODULE } from 'modules/account-group';

type WorkflowInput = {
    accountGroup: Partial<AccountGroup>;
};

export const updateAccountGroupStep = createStep(
    'update-account-group-step',
    async (input: WorkflowInput, { container }) => {
        const accountGroupModuleService: AccountGroupModuleService =
            container.resolve(ACCOUNT_GROUP_MODULE);

        // Retrieve the original account group for compensation
        const original = await accountGroupModuleService.retrieveAccountGroup(
            input.accountGroup.id,
        );

        const updated = await accountGroupModuleService.updateAccountGroups(input.accountGroup);

        return new StepResponse(updated, original);
    },

    // Compensation function
    async (original, { container }) => {
        if (!original) {
            return;
        }

        const accountGroupModuleService: AccountGroupModuleService =
            container.resolve(ACCOUNT_GROUP_MODULE);

        await accountGroupModuleService.updateAccountGroups(original);
    },
);

export const updateAccountGroupWorkflow = createWorkflow<WorkflowInput, any, any>(
    'update-account-group-workflow',
    (input: WorkflowInput) => {
        const account_group = updateAccountGroupStep(input);
        return new WorkflowResponse({ account_group });
    },
);
