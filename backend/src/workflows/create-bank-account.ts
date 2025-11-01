import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
    when,
} from '@medusajs/framework/workflows-sdk';
import BankAccountModuleService from '../modules/bank-account/services/service';
import { BANK_ACCOUNT_MODULE } from '../modules/bank-account';
import { CustomerDTO } from '@medusajs/types';
import { createRemoteLinkStep } from '@medusajs/core-flows';
import { Modules } from '@medusajs/utils';

export type CreateBankAccountStepInput = {
    customer: CustomerDTO;
    additional_data?: {
        bank_name: string;
        bank_code: string;
        branch_code: string;
        city: string;
        address: string;
        account_number: string;
        account_holder: string;
        iban: string;
        bic: string;
        rib_key: string;
    };
};

type CreateBankAccountWorkflowInput = {
    customer: CustomerDTO;
    additional_data?: {
        bank_name: string;
        bank_code: string;
        branch_code: string;
        city: string;
        address: string;
        account_number: string;
        account_holder: string;
        iban: string;
        bic: string;
        rib_key: string;
    };
};

export const createBankAccountStep = createStep(
    'create-bank-account-step',
    async (input: CreateBankAccountStepInput, { container }) => {
        const bankAccountModuleService: BankAccountModuleService =
            container.resolve(BANK_ACCOUNT_MODULE);

        const bankAccount = await bankAccountModuleService.createBankAccounts(
            input.additional_data,
        );

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
