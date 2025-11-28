import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { BILLING_CYCLE_MODULE } from '../../modules/billing-cycle';
import BillingCycleModuleService from '../../modules/billing-cycle/services/service';

type CreateBillingCycleWorkflowInput = {
    name: string;
};

export const createBillingCycleStep = createStep(
    'create-billing-cycle-step',
    async (input: CreateBillingCycleWorkflowInput, { container }) => {
        const billingCycleModuleService: BillingCycleModuleService =
            container.resolve(BILLING_CYCLE_MODULE);

        const billingCycle = await billingCycleModuleService.createBillingCycles(input);

        return new StepResponse(billingCycle, billingCycle.id);
    },

    // Compensation function
    async (id: string, { container }) => {
        const billingCycleModuleService: BillingCycleModuleService =
            container.resolve(BILLING_CYCLE_MODULE);

        await billingCycleModuleService.deleteBillingCycles(id);
    },
);

export const createBillingCycleWorkflow = createWorkflow(
    'create-billing-cycle',
    (input: CreateBillingCycleWorkflowInput) => {
        const billingCycle = createBillingCycleStep(input);

        return new WorkflowResponse(billingCycle);
    },
);
