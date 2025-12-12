import type { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
import { Modules } from '@medusajs/framework/utils';
import { EmailTemplates } from 'modules/email-notifications/templates';
import { StoreOrder } from '@medusajs/types';

export default async function paymentCapturedHandler({
    event: { data },
    container,
}: SubscriberArgs<{ id: string }>) {
    const customerModuleService = container.resolve(Modules.CUSTOMER);
    const notificationModuleService = container.resolve(Modules.NOTIFICATION);
    const paymentModuleService = container.resolve(Modules.PAYMENT);
    const query = container.resolve('query');
    const replyTo = process.env.CONTACT_FORM_EMAIL || undefined;

    const payment = await paymentModuleService.retrievePayment(data.id);

    const { data: paymentCollections } = await query.graph({
        entity: 'payment_collection',
        fields: ['order.*'],
        filters: { id: payment.payment_collection_id },
    });

    const order: StoreOrder = paymentCollections[0].order;
    const customer = await customerModuleService.retrieveCustomer(order.customer_id);

    try {
        await notificationModuleService.createNotifications({
            to: customer.email,
            channel: 'email',
            template: EmailTemplates.PAYMENT_CAPTURED,
            data: {
                emailOptions: {
                    replyTo,
                    subject: 'Confirmation de réception de votre paiement',
                },
                firstName: customer.first_name,
                lastName: customer.last_name,
                preview: 'Confirmation de réception de votre paiement',
                amount: payment.amount,
                currency: payment.currency_code,
                orderId: order.display_id,
            },
        });
    } catch (error) {
        console.error('Error sending payment captured notification:', error);
    }
}

export const config: SubscriberConfig = {
    event: 'payment.captured',
};
