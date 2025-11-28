import {
    createWorkflow,
    WorkflowResponse,
    createStep,
    StepResponse,
} from '@medusajs/framework/workflows-sdk';
import CustomPaymentMethodModuleService from '../../modules/custom-payment-method/services/service';
import { CUSTOM_PAYMENT_METHOD_MODULE } from '../../modules/custom-payment-method';
import { CustomPaymentMethod } from '../lib/types';

const getCustomPaymentMethodsStep = createStep(
    'get-custom-payment-methods',
    async (_input, { container }) => {
        const customPaymentMethodModuleService: CustomPaymentMethodModuleService =
            container.resolve(CUSTOM_PAYMENT_METHOD_MODULE);
        const customPaymentMethods =
            await customPaymentMethodModuleService.listCustomPaymentMethods({});

        return new StepResponse(customPaymentMethods);
    },
);

export const getCustomPaymentMethodsWorkflow = createWorkflow<CustomPaymentMethod, any, any>(
    'get-custom-payment-methods-workflow',
    () => {
        const customPaymentMethods = getCustomPaymentMethodsStep();

        return new WorkflowResponse({ customPaymentMethods });
    },
);
