import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
import { Modules } from '@medusajs/framework/utils';
import { EmailTemplates } from 'modules/email-notifications/templates';

export default async function customerCreatedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }>) {
    const customerModuleService = container.resolve(Modules.CUSTOMER);
    const notificationModuleService = container.resolve(Modules.NOTIFICATION);
    const replyTo = process.env.CONTACT_FORM_EMAIL || undefined;

    const customer = await customerModuleService.retrieveCustomer(data.id);
    console.log(customer);
    try {
        await notificationModuleService.createNotifications({
            to: customer.email,
            channel: 'email',
            template: EmailTemplates.CUSTOMER_CREATED,
            data: {
                emailOptions: {
                    replyTo,
                    subject: 'Confirmation de création de votre compte entreprise',
                },
                firstName: customer.first_name,
                lastName: customer.last_name,
                preview: 'Confirmation de création de votre compte entreprise',
            },
        });
    } catch (error) {
        console.error('Error sending customer created notification:', error);
    }
}

export const config: SubscriberConfig = {
    event: 'customer.created',
};
