import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
    when,
} from '@medusajs/framework/workflows-sdk';
import { LOCATION_MODULE } from '../../modules/location';
import { createRemoteLinkStep } from '@medusajs/core-flows';
import { Modules } from '@medusajs/utils';
import { CustomerDTO } from '@medusajs/types';
import { Location } from '../../lib/types';
import LocationModuleService from '../../modules/location/services/service';

type CreateLocationWorkflowInput = {
    customer: CustomerDTO;
    location: Location;
};

export const createLocationStep = createStep(
    'create-location-step',
    async (input: CreateLocationWorkflowInput, { container }) => {
        const locationModuleService: LocationModuleService = container.resolve(LOCATION_MODULE);

        const location = await locationModuleService.createLocations(input.location);

        return new StepResponse(location, location.id);
    },

    // Compensation function
    async (id: string, { container }) => {
        const locationModuleService: LocationModuleService = container.resolve(LOCATION_MODULE);

        await locationModuleService.deleteLocations(id);
    },
);

export const createLocationWorkflow = createWorkflow(
    'create-location',
    (input: CreateLocationWorkflowInput) => {
        const location = createLocationStep(input);

        when(
            'location-created',
            { location: location },
            ({ location }) => location !== undefined,
        ).then(() => {
            createRemoteLinkStep([
                {
                    [Modules.CUSTOMER]: { customer_id: input.customer.id },
                    [LOCATION_MODULE]: { location_id: location.id },
                },
            ]);

            return new WorkflowResponse(location);
        });
    },
);
