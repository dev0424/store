import { Location } from '../../lib/types';
import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import LocationModuleService from '../../modules/location/services/service';
import { LOCATION_MODULE } from '../../modules/location';
import { useQueryGraphStep } from '@medusajs/medusa/core-flows';
import LocationLink from '../../links/location';

type WorkflowInput = {
    customer_id: string;
    update: Partial<Location>;
};

export const updateLocationStep = createStep(
    'update-location-step',
    async (
        { location_id, update }: { location_id: string; update: Partial<Location> },
        { container },
    ) => {
        const locationModuleService: LocationModuleService = container.resolve(LOCATION_MODULE);

        // Retrieve the original data before updating
        const prevData = await locationModuleService.retrieveLocation(location_id);

        // Perform the update
        const location = await locationModuleService.updateLocations({
            id: location_id,
            ...update,
        });

        // Pass the original data to the compensation function
        return new StepResponse(location, prevData);
    },

    // Compensation function: revert to the original data
    async (prevData, { container }) => {
        if (!prevData) {
            return;
        }
        const locationModuleService: LocationModuleService = container.resolve(LOCATION_MODULE);

        // Restore the original data
        await locationModuleService.updateLocations(prevData);
    },
);

export const updateLocationWorkflow = createWorkflow<WorkflowInput, { location: Location }, any>(
    'update-location-workflow',
    (input: WorkflowInput) => {
        const { data: links } = useQueryGraphStep({
            entity: LocationLink.entryPoint,
            fields: ['*', 'location.*'],
            filters: {
                customer_id: input.customer_id,
            },
            options: {
                throwIfKeyNotFound: true,
            },
        });

        const location_id = links[0].location_id;

        const location = updateLocationStep({ location_id, update: input.update });
        return new WorkflowResponse({ location: location });
    },
);
