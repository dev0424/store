import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { ACCOUNT_STATUS_MODULE } from '../modules/account-status/index';
import { AccountStatus } from '../lib/types';
import AccountStatusModuleService from '../modules/account-status/services/service';

export const updateAccountStatusStep = createStep(
    'update-account-status-step',
    async (accountStatus: AccountStatus, { container }) => {
        const accountStatusModuleService: AccountStatusModuleService =
            container.resolve(ACCOUNT_STATUS_MODULE);

        // Retrieve the original account status for compensation
        const original = await accountStatusModuleService.retrieveAccountStatus(accountStatus.id);

        // @ts-expect-error service method name auto-generation is wrong by Medusa JS
        const updated = await accountStatusModuleService.updateAccountStatuses(accountStatus);

        return new StepResponse(updated, original);
    },

    // Compensation function
    async (original, { container }) => {
        if (!original) {
            return;
        }

        const accountStatusModuleService: AccountStatusModuleService =
            container.resolve(ACCOUNT_STATUS_MODULE);

        // @ts-expect-error service method name auto-generation is wrong by Medusa JS
        await accountStatusModuleService.updateAccountStatuses(original);
    },
);

export const updateAccountStatusWorkflow = createWorkflow(
    'update-account-status',
    (accountStatus: AccountStatus) => {
        const updatedAccountStatus = updateAccountStatusStep(accountStatus);

        return new WorkflowResponse(updatedAccountStatus);
    },
);
