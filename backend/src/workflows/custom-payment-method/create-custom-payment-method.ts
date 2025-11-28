import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { CUSTOM_PAYMENT_METHOD_MODULE } from '../../modules/custom-payment-method';
import CustomPaymentMethodModuleService from '../../modules/custom-payment-method/services/service';

type CreateCustomPaymentMethodWorkflowInput = {
    name: string;
};

export const createCustomPaymentMethodStep = createStep(
    'create-custom-payment-method-step',
    async (input: CreateCustomPaymentMethodWorkflowInput, { container }) => {
        const customPaymentMethodModuleService: CustomPaymentMethodModuleService =
            container.resolve(CUSTOM_PAYMENT_METHOD_MODULE);

        const customPaymentMethod =
            await customPaymentMethodModuleService.createCustomPaymentMethods(input);

        return new StepResponse(customPaymentMethod, customPaymentMethod.id);
    },

    // Compensation function
    async (id: string, { container }) => {
        const customPaymentMethodModuleService: CustomPaymentMethodModuleService =
            container.resolve(CUSTOM_PAYMENT_METHOD_MODULE);

        await customPaymentMethodModuleService.deleteCustomPaymentMethods(id);
    },
);

export const createCustomPaymentMethodWorkflow = createWorkflow(
    'create-custom-payment-method',
    (input: CreateCustomPaymentMethodWorkflowInput) => {
        const customPaymentMethodStep = createCustomPaymentMethodStep(input);

        return new WorkflowResponse(customPaymentMethodStep);
    },
);
