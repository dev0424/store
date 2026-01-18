import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
    when,
} from '@medusajs/framework/workflows-sdk';
import BankAccountModuleService from '../../modules/bank-account/services/service';
import { BANK_ACCOUNT_MODULE } from '../../modules/bank-account';
import { createRemoteLinkStep } from '@medusajs/core-flows';
import { Modules } from '@medusajs/utils';
import { CustomerDTO } from '@medusajs/types';
import { BankAccount } from '../../lib/types';

type CreateBankAccountWorkflowInput = {
    customer: CustomerDTO;
    bank_account: BankAccount;
};

export const createBankAccountStep = createStep(
    'create-bank-account-step',
    async (input: CreateBankAccountWorkflowInput, { container }) => {
        const bankAccountModuleService: BankAccountModuleService =
            container.resolve(BANK_ACCOUNT_MODULE);

        const bankAccount = await bankAccountModuleService.createBankAccounts(input.bank_account);

        return new StepResponse(bankAccount, bankAccount.id);
    },

    // Compensation function
    async (id: string, { container }) => {
        const bankAccountModuleService: BankAccountModuleService =
            container.resolve(BANK_ACCOUNT_MODULE);

        await bankAccountModuleService.deleteBankAccounts(id);
    },
);

export const createBankAccountWorkflow = createWorkflow(
    'create-bank-account',
    (input: CreateBankAccountWorkflowInput) => {
        const bankAccount = createBankAccountStep(input);

        when(
            'bank-account-created',
            { bankAccount },
            ({ bankAccount }) => bankAccount !== undefined,
        ).then(() => {
            createRemoteLinkStep([
                {
                    [Modules.CUSTOMER]: { customer_id: input.customer.id },
                    [BANK_ACCOUNT_MODULE]: { bank_account_id: bankAccount.id },
                },
            ]);

            return new WorkflowResponse(bankAccount);
        });
    },
);
