import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
    when,
} from '@medusajs/framework/workflows-sdk';
import { ACCOUNT_GROUP_MODULE } from '../../modules/account-group';
import { createRemoteLinkStep } from '@medusajs/core-flows';
import { Modules } from '@medusajs/utils';
import { CustomerDTO } from '@medusajs/types';
import { AccountGroup } from '../../lib/types';
import AccountGroupModuleService from '../../modules/account-group/services/service';

type WorkflowInput = {
    customer: CustomerDTO;
    account_group: AccountGroup;
};

export const createAccountGroupStep = createStep(
    'create-account-group-step',
    async (input: WorkflowInput, { container }) => {
        const accountGroupModuleService: AccountGroupModuleService =
            container.resolve(ACCOUNT_GROUP_MODULE);

        const accountStatus = await accountGroupModuleService.createAccountGroups(
            input.account_group,
        );

        return new StepResponse(accountStatus, accountStatus.id);
    },

    // Compensation function
    async (id: string, { container }) => {
        const accountGroupModuleService: AccountGroupModuleService =
            container.resolve(ACCOUNT_GROUP_MODULE);

        await accountGroupModuleService.deleteAccountGroups(id);
    },
);

export const createAccountGroupWorkflow = createWorkflow(
    'create-account-group',
    (input: WorkflowInput) => {
        const accountGroup = createAccountGroupStep(input);

        when(
            'account-status-created',
            { accountGroup },
            ({ accountGroup }) => accountGroup !== undefined,
        ).then(() => {
            createRemoteLinkStep([
                {
                    [Modules.CUSTOMER]: { customer_id: input.customer.id },
                    [ACCOUNT_GROUP_MODULE]: { account_group_id: accountGroup.id },
                },
            ]);

            return new WorkflowResponse(accountGroup);
        });
    },
);
