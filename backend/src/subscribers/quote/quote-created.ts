import { Modules } from '@medusajs/framework/utils';
import { INotificationModuleService, IOrderModuleService } from '@medusajs/framework/types';
import { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa';
import { EmailTemplates } from '../../modules/email-notifications/templates';

export default async function quoteCreatedHandler({
    event: { data },
    container,
}: SubscriberArgs<any>) {
    const notificationModuleService: INotificationModuleService = container.resolve(
        Modules.NOTIFICATION,
    );
    const orderModuleService: IOrderModuleService = container.resolve(Modules.ORDER);

    const order = await orderModuleService.retrieveOrder(data.id, {
        relations: ['items', 'summary', 'shipping_address'],
    });
    const shippingAddress = await (orderModuleService as any).orderAddressService_.retrieve(
        order.shipping_address.id,
    );
    const replyTo = process.env.CONTACT_FORM_EMAIL || undefined;

    try {
        await notificationModuleService.createNotifications([
            {
                to: order.email,
                channel: 'email',
                template: EmailTemplates.QUOTE_CREATED,
                data: {
                    emailOptions: {
                        replyTo,
                        subject: `Confirmation de votre devis #${order.display_id}`,
                    },
                    order,
                    shippingAddress,
                    preview: `Confirmation de votre devis #${order.display_id}`,
                },
            },
            {
                to: replyTo,
                channel: 'email',
                template: EmailTemplates.ADMIN_QUOTE_CREATED,
                data: {
                    emailOptions: {
                        replyTo,
                        subject: `New quote received – Quote #${order.display_id}`,
                    },
                    order,
                    shippingAddress,
                    preview: `New quote received – Quote #${order.display_id}`,
                },
            },
        ]);
    } catch (error) {
        console.error('Error sending quote confirmation notifications:', error);
    }
}

export const config: SubscriberConfig = {
    event: 'quote.created',
};
