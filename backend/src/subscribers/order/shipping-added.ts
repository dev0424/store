import { SubscriberArgs, type SubscriberConfig } from '@medusajs/framework';
import { Modules } from '@medusajs/framework/utils';
import { EmailTemplates } from 'modules/email-notifications/templates';

export default async function shippingAddedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ order_id: string }>) {
    const customerModuleService = container.resolve(Modules.CUSTOMER);
    const notificationModuleService = container.resolve(Modules.NOTIFICATION);
    const replyTo = process.env.CONTACT_FORM_EMAIL || undefined;
    const loginUrl = `${process.env.STOREFRONT_URL}/account`;
    const orderId = data.order_id;

    const customer = await customerModuleService.retrieveCustomer(data.id);

    try {
        await notificationModuleService.createNotifications({
            to: customer.email,
            channel: 'email',
            template: EmailTemplates.SHIPPING_ADDED,
            data: {
                emailOptions: {
                    replyTo,
                    subject: 'Mise à jour de votre devis',
                },
                firstName: customer.first_name,
                lastName: customer.last_name,
                preview: 'Mise à jour de votre devis',
                loginUrl,
                orderId,
            },
        });
    } catch (error) {
        console.error('Error sending shipping added notification:', error);
    }
}

export const config: SubscriberConfig = {
    event: 'draft-order.shipping-added',
};
