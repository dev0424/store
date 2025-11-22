import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { Modules } from '@medusajs/framework/utils';
import type { CreateNotificationDTO } from '@medusajs/framework/types';
import { ContactForm } from '../lib/types';

const sendContactNotificationStep = createStep(
    'send-contact-notification',
    async (input: ContactForm, { container }) => {
        const toEmail = process.env.CONTACT_FORM_EMAIL || undefined;

        if (!toEmail) {
            throw new Error(
                'Contact email address is missing. Set CONTACT_FORM_EMAIL environment variable.',
            );
        }

        const notificationModuleService = container.resolve(Modules.NOTIFICATION);

        const data: CreateNotificationDTO[] = [
            {
                to: toEmail,
                channel: 'email',
                template: 'contact-form',
                data: {
                    first_name: input.first_name,
                    last_name: input.last_name,
                    email: input.email,
                    phone: input.phone,
                    message: input.message,
                },
            },
        ];
        const notification = await notificationModuleService.createNotifications(data);
        return new StepResponse(notification);
    },
);

export const sendContactEmailWorkflow = createWorkflow<ContactForm, any, any>(
    'send-contact-email',
    (input: ContactForm) => {
        const notification = sendContactNotificationStep(input);

        return new WorkflowResponse({
            notification,
        });
    },
);
