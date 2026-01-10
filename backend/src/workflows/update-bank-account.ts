import { BankAccount } from '../lib/types';
import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import BankAccountModuleService from '../modules/bank-account/services/service';
import { BANK_ACCOUNT_MODULE } from '../modules/bank-account';

type WorkflowInput = {
    customerId: string;
    bankAccount: BankAccount;
};

export const updateBankAccountStep = createStep(
    'update-bank-account-step',
    async (input: WorkflowInput, { container }) => {
        const bankAccountModuleService: BankAccountModuleService =
            container.resolve(BANK_ACCOUNT_MODULE);

        // Retrieve the original data before updating
        const prevData = await bankAccountModuleService.retrieveBankAccount(input.bankAccount.id);

        // Perform the update
        const bankAccount = await bankAccountModuleService.updateBankAccounts(input.bankAccount);

        // Pass the original data to the compensation function
        return new StepResponse(bankAccount, prevData);
    },

    // Compensation function: revert to the original data
    async (prevData, { container }) => {
        if (!prevData) {
            return;
        }
        const bankAccountModuleService: BankAccountModuleService =
            container.resolve(BANK_ACCOUNT_MODULE);

        // Restore the original data
        await bankAccountModuleService.updateBankAccounts(prevData);
    },
);

export const updateBankAccountWorkflow = createWorkflow<
    WorkflowInput,
    { bankAccount: BankAccount },
    any
>('update-bank-account-workflow', (input: WorkflowInput) => {
    const bankAccount = updateBankAccountStep(input);
    return new WorkflowResponse({ bankAccount });
});
