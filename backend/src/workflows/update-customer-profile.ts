import { CustomerProfile } from '../lib/types';
import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import CustomerProfileModuleService from '../modules/customer-profile/services/service';
import { CUSTOMER_PROFILE_MODULE } from '../modules/customer-profile';

export const updateCustomerProfileStep = createStep(
    'update-customer-profile-step',
    async (input: CustomerProfile, { container }) => {
        const customerProfileModuleService: CustomerProfileModuleService =
            container.resolve(CUSTOMER_PROFILE_MODULE);

        // Retrieve the original data before updating
        const prevData = await customerProfileModuleService.retrieveCustomerProfile(input.id);

        // Perform the update
        const customerProfile = await customerProfileModuleService.updateCustomerProfiles(input);

        // Pass the original data to the compensation function
        return new StepResponse(customerProfile, prevData);
    },

    // Compensation function: revert to the original data
    async (prevData, { container }) => {
        if (!prevData) {
            return;
        }
        const customerProfileModuleService: CustomerProfileModuleService =
            container.resolve(CUSTOMER_PROFILE_MODULE);

        // Restore the original data
        await customerProfileModuleService.updateCustomerProfiles(prevData);
    },
);

export const updateCustomerProfileWorkflow = createWorkflow<
    CustomerProfile,
    { customerProfile: CustomerProfile },
    any
>('update-customer-profile-workflow', (input: CustomerProfile) => {
    const customerProfile = updateCustomerProfileStep(input);
    return new WorkflowResponse({ customerProfile });
});
