import {
    createWorkflow,
    WorkflowResponse,
    createStep,
    StepResponse,
} from '@medusajs/framework/workflows-sdk';
import { ApplicationStatusEnum } from '../../modules/account-status/constants';

const getDistributorsStep = createStep('get-distributors-step', async ({}, { container }) => {
    const query = container.resolve('query');

    const { data } = await query.graph({
        entity: 'customer',
        fields: ['*', 'account_status.*', 'location.*'],
    });

    const distributors = data.filter(
        distributor =>
            distributor.account_status.application_status === ApplicationStatusEnum.APPROVED &&
            distributor.account_status.is_searchable === true,
    );

    return new StepResponse({ distributors });
});

export const getDistributors = createWorkflow('get-distributors', () => {
    const { distributors } = getDistributorsStep();

    return new WorkflowResponse({
        distributors,
    });
});
