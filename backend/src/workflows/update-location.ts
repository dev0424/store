import { Location } from '../lib/types';
import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import LocationModuleService from '../modules/location/services/service';
import { LOCATION_MODULE } from '../modules/location';

export const updateLocationStep = createStep(
    'update-location-step',
    async (input: Location, { container }) => {
        const locationModuleService: LocationModuleService = container.resolve(LOCATION_MODULE);

        // Retrieve the original data before updating
        const prevData = await locationModuleService.retrieveLocation(input.id);

        // Perform the update
        const location = await locationModuleService.updateLocations(input);

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

export const updateCustomerProfileWorkflow = createWorkflow<Location, { location: Location }, any>(
    'update-location-workflow',
    (input: Location) => {
        const location = updateLocationStep(input);
        return new WorkflowResponse({ location: location });
    },
);
