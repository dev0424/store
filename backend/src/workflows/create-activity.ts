import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { ACTIVITY_MODULE } from '../modules/activity/index';
import ActivityModuleService from '../modules/activity/services/service';

type CreateActivityWorkflowInput = {
    name: string;
};

export const createActivityStep = createStep(
    'create-activity-step',
    async (input: CreateActivityWorkflowInput, { container }) => {
        const activityModuleService: ActivityModuleService = container.resolve(ACTIVITY_MODULE);

        const activity = await activityModuleService.createActivities(input);

        return new StepResponse(activity, activity.id);
    },

    // Compensation function
    async (id: string, { container }) => {
        const activityModuleService: ActivityModuleService = container.resolve(ACTIVITY_MODULE);

        await activityModuleService.deleteActivities(id);
    },
);

export const createActivityWorkflow = createWorkflow(
    'create-activity',
    (input: CreateActivityWorkflowInput) => {
        const activity = createActivityStep(input);

        return new WorkflowResponse(activity);
    },
);
