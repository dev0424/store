import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
    when,
} from '@medusajs/framework/workflows-sdk';
import { BILLING_ADDRESS_MODULE } from '../modules/billing-address/index';
import { createRemoteLinkStep } from '@medusajs/core-flows';
import { Modules } from '@medusajs/utils';
import { CustomerDTO } from '@medusajs/types';
import { BillingAddress } from '../lib/types';
import BillingAddressModuleService from '../modules/billing-address/services/service';

type CreateBillingAddressWorkflowInput = {
    customer: CustomerDTO;
    billing_address: BillingAddress;
};

export const createBillingAddressStep = createStep(
    'create-billing-address-step',
    async (input: CreateBillingAddressWorkflowInput, { container }) => {
        const billingAddressModuleService: BillingAddressModuleService =
            container.resolve(BILLING_ADDRESS_MODULE);

        const billingAddress = await billingAddressModuleService.createBillingAddresses(
            input.billing_address,
        );

        return new StepResponse(billingAddress, billingAddress.id);
    },

    // Compensation function
    async (id: string, { container }) => {
        const billingAddressModuleService: BillingAddressModuleService =
            container.resolve(BILLING_ADDRESS_MODULE);

        await billingAddressModuleService.deleteBillingAddresses(id);
    },
);

export const createBillingAddressWorkflow = createWorkflow(
    'create-billing-address',
    (input: CreateBillingAddressWorkflowInput) => {
        const billingAddress = createBillingAddressStep(input);

        when(
            'billing-address-created',
            { billingAddress: billingAddress },
            ({ billingAddress }) => billingAddress !== undefined,
        ).then(() => {
            createRemoteLinkStep([
                {
                    [Modules.CUSTOMER]: { customer_id: input.customer.id },
                    [BILLING_ADDRESS_MODULE]: { billing_address_id: billingAddress.id },
                },
            ]);

            return new WorkflowResponse(billingAddress);
        });
    },
);
