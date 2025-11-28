import {
    createWorkflow,
    WorkflowResponse,
    createStep,
    StepResponse,
} from '@medusajs/framework/workflows-sdk';
import BillingCycleModuleService from '../../modules/billing-cycle/services/service';
import { BILLING_CYCLE_MODULE } from '../../modules/billing-cycle';
import { BillingCycle } from '../../lib/types';

const getBillingCyclesStep = createStep('get-billing-cycles', async (_input, { container }) => {
    const billingCycleModuleService: BillingCycleModuleService =
        container.resolve(BILLING_CYCLE_MODULE);
    const billingCycles = await billingCycleModuleService.listBillingCycles({});

    return new StepResponse(billingCycles);
});

export const getBillingCyclesWorkflow = createWorkflow<BillingCycle, any, any>(
    'get-billing-cycles-workflow',
    () => {
        const billingCycles = getBillingCyclesStep();

        return new WorkflowResponse({ billingCycles });
    },
);
