import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
    when,
} from '@medusajs/framework/workflows-sdk';
import { ACCOUNT_STATUS_MODULE } from '../modules/account-status/index';
import { createRemoteLinkStep } from '@medusajs/core-flows';
import { Modules } from '@medusajs/utils';
import { CustomerDTO } from '@medusajs/types';
import { AccountStatus } from '../lib/types';
import AccountStatusModuleService from '../modules/account-status/services/service';

type CreateAccountStatusWorkflowInput = {
    customer: CustomerDTO;
    account_status: AccountStatus;
};

export const createAccountStatusStep = createStep(
    'create-account-status-step',
    async (input: CreateAccountStatusWorkflowInput, { container }) => {
        const accountStatusModuleService: AccountStatusModuleService =
            container.resolve(ACCOUNT_STATUS_MODULE);

        // @ts-expect-error service method name auto-generation is wrong by Medusa JS
        const accountStatus = await accountStatusModuleService.createAccountStatuses(
            input.account_status,
        );

        return new StepResponse(accountStatus, accountStatus.id);
    },

    // Compensation function
    async (id: string, { container }) => {
        const accountStatusModuleService: AccountStatusModuleService =
            container.resolve(ACCOUNT_STATUS_MODULE);

        await accountStatusModuleService.deleteAccountStatus(id);
    },
);

export const createAccountStatusWorkflow = createWorkflow(
    'create-account-status',
    (input: CreateAccountStatusWorkflowInput) => {
        const accountStatus = createAccountStatusStep(input);

        when(
            'account-status-created',
            { accountStatus: accountStatus },
            ({ accountStatus }) => accountStatus !== undefined,
        ).then(() => {
            createRemoteLinkStep([
                {
                    [Modules.CUSTOMER]: { customer_id: input.customer.id },
                    [ACCOUNT_STATUS_MODULE]: { account_status_id: accountStatus.id },
                },
            ]);

            return new WorkflowResponse(accountStatus);
        });
    },
);
