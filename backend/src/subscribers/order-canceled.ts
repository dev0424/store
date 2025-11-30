import { SubscriberArgs, type SubscriberConfig } from '@medusajs/framework';
import { INotificationModuleService, IOrderModuleService } from '@medusajs/framework/types';
import { Modules } from '@medusajs/framework/utils';
import { EmailTemplates } from 'modules/email-notifications/templates';

export default async function orderCanceledHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }>) {
    const replyTo = process.env.CONTACT_FORM_EMAIL || undefined;

    const customerModuleService = container.resolve(Modules.CUSTOMER);
    const notificationModuleService: INotificationModuleService = container.resolve(
        Modules.NOTIFICATION,
    );
    const orderModuleService: IOrderModuleService = container.resolve(Modules.ORDER);

    const order = await orderModuleService.retrieveOrder(data.id, {
        relations: ['items', 'summary', 'shipping_address'],
    });

    const customer = await customerModuleService.retrieveCustomer(order.customer_id);

    try {
        await notificationModuleService.createNotifications({
            to: customer.email,
            channel: 'email',
            template: EmailTemplates.ORDER_CANCELED,
            data: {
                emailOptions: {
                    replyTo,
                    subject: 'Annulation de votre commande',
                },
                firstName: customer.first_name,
                lastName: customer.last_name,
                orderId: order.display_id,
                preview: 'Annulation de votre commande',
            },
        });
    } catch (error) {
        console.error('Error sending order canceled notification:', error);
    }
}

export const config: SubscriberConfig = {
    event: 'order.canceled',
};
