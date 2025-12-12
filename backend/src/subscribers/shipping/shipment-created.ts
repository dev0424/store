import { SubscriberArgs, type SubscriberConfig } from '@medusajs/framework';
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils';
import { EmailTemplates } from 'modules/email-notifications/templates';
import { AdminFulfillment, AdminFulfillmentLabel, StoreOrder } from '@medusajs/types';

export default async function shipmentCreatedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string; no_notification?: boolean }>) {
    const notificationModuleService = container.resolve(Modules.NOTIFICATION);
    const customerModuleService = container.resolve(Modules.CUSTOMER);
    const logger = container.resolve('logger');
    const query = container.resolve(ContainerRegistrationKeys.QUERY);
    const replyTo = process.env.CONTACT_FORM_EMAIL || undefined;

    const { data: fulfillments } = await query.graph({
        entity: 'fulfillment',
        fields: ['id', 'labels.*', 'order.*'],
        filters: {
            id: data.id,
        },
    });

    if (!fulfillments?.length) {
        logger.warn(`Fulfillment ${data.id} not found`);
        return;
    }

    const fulfillment: AdminFulfillment = fulfillments[0];
    const labels: AdminFulfillmentLabel[] = fulfillment.labels || [];
    const order: StoreOrder = fulfillments[0].order;

    const customer = await customerModuleService.retrieveCustomer(order.customer_id);

    try {
        await notificationModuleService.createNotifications({
            to: customer.email,
            channel: 'email',
            template: EmailTemplates.SHIPMENT_CREATED,
            data: {
                emailOptions: {
                    replyTo,
                    subject: 'Votre commande a été expédiée',
                },
                firstName: customer.first_name,
                lastName: customer.last_name,
                preview: 'Votre commande a été expédiée',
                orderId: order.display_id,
                labels,
            },
        });
    } catch (error) {
        console.error('Error sending shipment created notification:', error);
    }
}

export const config: SubscriberConfig = {
    event: 'shipment.created',
};
