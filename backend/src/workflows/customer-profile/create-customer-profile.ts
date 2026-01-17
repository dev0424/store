import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
    when,
} from '@medusajs/framework/workflows-sdk';
import { CUSTOMER_PROFILE_MODULE } from '../../modules/customer-profile';
import { createRemoteLinkStep } from '@medusajs/core-flows';
import { Modules } from '@medusajs/utils';
import { CustomerDTO } from '@medusajs/types';
import { CustomerProfile } from '../../lib/types';
import CustomerProfileModuleService from '../../modules/customer-profile/services/service';

type CreateCustomerProfileWorkflowInput = {
    customer: CustomerDTO;
    customer_profile: CustomerProfile;
};

export const createCustomerProfileStep = createStep(
    'create-customer-profile-step',
    async (input: CreateCustomerProfileWorkflowInput, { container }) => {
        const customerProfileModuleService: CustomerProfileModuleService =
            container.resolve(CUSTOMER_PROFILE_MODULE);

        const customerProfile = await customerProfileModuleService.createCustomerProfiles(
            input.customer_profile,
        );

        return new StepResponse(customerProfile, customerProfile.id);
    },

    // Compensation function
    async (id: string, { container }) => {
        const customerProfileModuleService: CustomerProfileModuleService =
            container.resolve(CUSTOMER_PROFILE_MODULE);

        await customerProfileModuleService.deleteCustomerProfiles(id);
    },
);

export const createCustomerProfileWorkflow = createWorkflow(
    'create-customer-profile',
    (input: CreateCustomerProfileWorkflowInput) => {
        const customerProfile = createCustomerProfileStep(input);

        when(
            'customer-profile-created',
            { customerProfile: customerProfile },
            ({ customerProfile }) => customerProfile !== undefined,
        ).then(() => {
            createRemoteLinkStep([
                {
                    [Modules.CUSTOMER]: { customer_id: input.customer.id },
                    [CUSTOMER_PROFILE_MODULE]: { customer_profile_id: customerProfile.id },
                },
            ]);

            return new WorkflowResponse(customerProfile);
        });
    },
);
