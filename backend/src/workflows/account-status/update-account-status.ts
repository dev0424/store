import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
    when,
} from '@medusajs/framework/workflows-sdk';
import { ACCOUNT_STATUS_MODULE } from '../../modules/account-status';
import { AccountStatus } from '../../lib/types';
import AccountStatusModuleService from '../../modules/account-status/services/service';
import { emitEventStep } from '@medusajs/core-flows';
import { ApplicationStatusEnum } from '../../modules/account-status/constants';

type UpdateAccountStatusWorkflowInput = {
    customerId: string;
    accountStatus: AccountStatus;
};

export const updateAccountStatusStep = createStep(
    'update-account-status-step',
    async (input: UpdateAccountStatusWorkflowInput, { container }) => {
        const accountStatusModuleService: AccountStatusModuleService =
            container.resolve(ACCOUNT_STATUS_MODULE);

        // Retrieve the original account status for compensation
        const original = await accountStatusModuleService.retrieveAccountStatus(
            input.accountStatus.id,
        );
        // @ts-expect-error service method name auto-generation is wrong by Medusa JS
        const updated = await accountStatusModuleService.updateAccountStatuses(input.accountStatus);

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
    (input: UpdateAccountStatusWorkflowInput) => {
        const updatedAccountStatus = updateAccountStatusStep(input);

        // Emit customer.approved when status becomes APPROVED
        when(
            updatedAccountStatus,
            accountStatus => accountStatus.application_status === ApplicationStatusEnum.APPROVED,
        ).then(() => {
            emitEventStep({
                eventName: 'customer.approved',
                data: {
                    id: input.customerId,
                },
            }).config({ name: 'emit-customer-approved' });
        });

        // Emit customer.declined when status becomes DECLINED
        when(
            updatedAccountStatus,
            accountStatus => accountStatus.application_status === ApplicationStatusEnum.DECLINED,
        ).then(() => {
            emitEventStep({
                eventName: 'customer.declined',
                data: {
                    id: input.customerId,
                },
            }).config({ name: 'emit-customer-declined' });
        });

        return new WorkflowResponse(updatedAccountStatus);
    },
);
