import { BillingAddress } from '../lib/types';
import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import BillingAddressModuleService from '../modules/billing-address/services/service';
import { BILLING_ADDRESS_MODULE } from '../modules/billing-address';

export const updateBillingAddressStep = createStep(
    'update-billing-address-step',
    async (input: BillingAddress, { container }) => {
        const billingAddressModuleService: BillingAddressModuleService =
            container.resolve(BILLING_ADDRESS_MODULE);

        // Retrieve the original data before updating
        const prevData = await billingAddressModuleService.retrieveBillingAddress(input.id);

        // Perform the update
        const billingAddress = await billingAddressModuleService.updateBillingAddresses(input);

        // Pass the original data to the compensation function
        return new StepResponse(billingAddress, prevData);
    },

    // Compensation function: revert to the original data
    async (prevData, { container }) => {
        if (!prevData) {
            return;
        }
        const billingAddressModuleService: BillingAddressModuleService =
            container.resolve(BILLING_ADDRESS_MODULE);

        // Restore the original data
        await billingAddressModuleService.updateBillingAddresses(prevData);
    },
);

export const updateBillingAddressWorkflow = createWorkflow<
    BillingAddress,
    { billingAddress: BillingAddress },
    any
>('update-billing-address-workflow', (input: BillingAddress) => {
    const billingAddress = updateBillingAddressStep(input);
    return new WorkflowResponse({ billingAddress: billingAddress });
});
