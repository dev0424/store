import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { AccountGroup, BankAccount } from 'lib/types';
import AccountGroupModuleService from 'modules/account-group/services/service';
import { ACCOUNT_GROUP_MODULE } from 'modules/account-group';
import { useQueryGraphStep } from '@medusajs/medusa/core-flows';
import AccountGroupLink from 'links/account-group';

type WorkflowInput = {
    customer_id: string;
    update: Partial<AccountGroup>;
};

export const updateAccountGroupStep = createStep(
    'update-account-group-step',
    async (
        { account_group_id, update }: { account_group_id: string; update: Partial<BankAccount> },
        { container },
    ) => {
        const accountGroupModuleService: AccountGroupModuleService =
            container.resolve(ACCOUNT_GROUP_MODULE);

        // Retrieve the original account group for compensation
        const original = await accountGroupModuleService.retrieveAccountGroup(account_group_id);

        const updated = await accountGroupModuleService.updateAccountGroups({
            id: account_group_id,
            ...update,
        });

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
        const { data: links } = useQueryGraphStep({
            entity: AccountGroupLink.entryPoint,
            fields: ['*', 'account_group.*'],
            filters: {
                customer_id: input.customer_id,
            },
            options: {
                throwIfKeyNotFound: true,
            },
        });

        const account_group_id = links[0].account_group_id;

        const account_group = updateAccountGroupStep({ account_group_id, update: input.update });
        return new WorkflowResponse({ account_group });
    },
);
