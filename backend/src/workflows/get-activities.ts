import {
    createWorkflow,
    WorkflowResponse,
    createStep,
    StepResponse,
} from '@medusajs/framework/workflows-sdk';
import ActivityModuleService from '../modules/activity/services/service';
import { ACTIVITY_MODULE } from '../modules/activity/index';
import { Activity } from '../lib/types';

const getActivitiesStep = createStep('get-activities', async (_input, { container }) => {
    const activityModuleService: ActivityModuleService = container.resolve(ACTIVITY_MODULE);
    const activities = await activityModuleService.listActivities({});

    return new StepResponse(activities);
});

export const getActivitiesWorkflow = createWorkflow<Activity, any, any>(
    'get-activities-workflow',
    () => {
        const activities = getActivitiesStep();

        return new WorkflowResponse({ activities });
    },
);
