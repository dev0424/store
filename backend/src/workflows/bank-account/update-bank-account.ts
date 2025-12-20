import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { useQueryGraphStep } from '@medusajs/medusa/core-flows';
import { BANK_ACCOUNT_MODULE } from '../../modules/bank-account';
import CustomerBankAccountLink from '../../links/bank-account';
import BankAccountModuleService from 'modules/bank-account/services/service';
import { BankAccount } from 'lib/types';

type WorkflowInput = {
    customer_id: string;
    update: Partial<BankAccount>;
};

const updateBankAccountStep = createStep(
    'update-bank-account',
    async (
        { bank_account_id, update }: { bank_account_id: string; update: Partial<BankAccount> },
        { container },
    ) => {
        const bankAccountModuleService: BankAccountModuleService =
            container.resolve(BANK_ACCOUNT_MODULE);

        // retrieve original data to be able to roll back
        const original = await bankAccountModuleService.retrieveBankAccount(bank_account_id);

        const updated = await bankAccountModuleService.updateBankAccounts({
            id: bank_account_id,
            ...update,
        });

        return new StepResponse(updated, original);
    },
    // Compensation function
    async (original, { container }) => {
        if (!original) {
            return;
        }

        const bankAccountModuleService: BankAccountModuleService =
            container.resolve(BANK_ACCOUNT_MODULE);

        await bankAccountModuleService.updateBankAccounts(original);
    },
);

export const updateBankAccountWorkflow = createWorkflow<any, any, any>(
    'update-bank-account',
    (input: WorkflowInput) => {
        const { data: links } = useQueryGraphStep({
            entity: CustomerBankAccountLink.entryPoint,
            fields: ['*', 'bank_account.*'],
            filters: {
                customer_id: input.customer_id,
            },
            options: {
                throwIfKeyNotFound: true,
            },
        });

        const bank_account_id = links[0].bank_account_id;

        const bank_account = updateBankAccountStep({
            bank_account_id,
            update: input.update,
        });

        return new WorkflowResponse({ bank_account });
    },
);
