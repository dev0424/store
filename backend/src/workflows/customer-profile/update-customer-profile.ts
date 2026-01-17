import { CustomerProfile } from '../../lib/types';
import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import CustomerProfileModuleService from '../../modules/customer-profile/services/service';
import { CUSTOMER_PROFILE_MODULE } from '../../modules/customer-profile';
import { useQueryGraphStep } from '@medusajs/medusa/core-flows';
import CustomerProfileLink from '../../links/customer-profile';

type WorkflowInput = {
    customer_id: string;
    update: Partial<CustomerProfile>;
};

export const updateCustomerProfileStep = createStep(
    'update-customer-profile-step',
    async (
        {
            customer_profile_id,
            update,
        }: { customer_profile_id: string; update: Partial<CustomerProfile> },
        { container },
    ) => {
        const customerProfileModuleService: CustomerProfileModuleService =
            container.resolve(CUSTOMER_PROFILE_MODULE);

        // Retrieve the original data before updating
        const prevData =
            await customerProfileModuleService.retrieveCustomerProfile(customer_profile_id);

        // Perform the update
        const customerProfile = await customerProfileModuleService.updateCustomerProfiles({
            id: customer_profile_id,
            ...update,
        });

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
    WorkflowInput,
    { customerProfile: CustomerProfile },
    any
>('update-customer-profile-workflow', (input: WorkflowInput) => {
    const { data: links } = useQueryGraphStep({
        entity: CustomerProfileLink.entryPoint,
        fields: ['*', 'customer_profile.*'],
        filters: {
            customer_id: input.customer_id,
        },
        options: {
            throwIfKeyNotFound: true,
        },
    });

    const customer_profile_id = links[0].customer_profile_id;

    const customerProfile = updateCustomerProfileStep({
        customer_profile_id,
        update: input.update,
    });

    return new WorkflowResponse({ customerProfile });
});
