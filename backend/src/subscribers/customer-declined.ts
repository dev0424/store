import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
import { Modules } from '@medusajs/framework/utils';
import { EmailTemplates } from 'modules/email-notifications/templates';

export default async function customerDeclinedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }>) {
    const customerModuleService = container.resolve(Modules.CUSTOMER);
    const notificationModuleService = container.resolve(Modules.NOTIFICATION);
    const replyTo = process.env.CONTACT_FORM_EMAIL || undefined;

    const customer = await customerModuleService.retrieveCustomer(data.id);

    try {
        await notificationModuleService.createNotifications({
            to: customer.email,
            channel: 'email',
            template: EmailTemplates.CUSTOMER_DECLINED,
            data: {
                emailOptions: {
                    replyTo,
                    subject: 'Mise à jour concernant votre demande d’inscription',
                },
                firstName: customer.first_name,
                lastName: customer.last_name,
                preview: 'Mise à jour concernant votre demande d’inscription',
            },
        });
    } catch (error) {
        console.error('Error sending customer declined notification:', error);
    }
}

export const config: SubscriberConfig = {
    event: 'customer.declined',
};
