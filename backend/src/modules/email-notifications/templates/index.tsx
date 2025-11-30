import { ReactNode } from 'react';
import { MedusaError } from '@medusajs/framework/utils';
import InviteUserEmail, { INVITE_USER, isInviteUserData } from './invite-user';
import OrderPlacedTemplate, { ORDER_PLACED, isOrderPlacedTemplateData } from './order-placed';
import { CONTACT_FORM, ContactFormEmail, isContactFormTemplateData } from './contact-form';
import PasswordResetEmail, { isPasswordResetTemplateData, PASSWORD_RESET } from './password-reset';
import CustomerCreatedEmail, { CUSTOMER_CREATED } from './customer-created';
import CustomerApprovedEmail, { CUSTOMER_APPROVED } from './customer-approved';
import CustomerDeclinedEmail, { CUSTOMER_DECLINED } from './customer-declined';
import PaymentCapturedEmail, { PAYMENT_CAPTURED } from './payment-captured';
import ShipmentCreatedEmail, { SHIPMENT_CREATED } from './shipment-created';
import OrderCanceledEmail, { ORDER_CANCELED } from './order-canceled';

export const EmailTemplates = {
    INVITE_USER,
    ORDER_PLACED,
    CONTACT_FORM,
    PASSWORD_RESET,
    CUSTOMER_CREATED,
    CUSTOMER_APPROVED,
    CUSTOMER_DECLINED,
    PAYMENT_CAPTURED,
    SHIPMENT_CREATED,
    ORDER_CANCELED,
} as const;

export function generateEmailTemplate(
    templateKey: string,
    data: any,
    publicUrl: string,
): ReactNode {
    switch (templateKey) {
        case EmailTemplates.INVITE_USER:
            if (!isInviteUserData(data)) {
                throw new MedusaError(
                    MedusaError.Types.INVALID_DATA,
                    `Invalid data for template "${EmailTemplates.INVITE_USER}"`,
                );
            }
            return <InviteUserEmail {...data} publicUrl={publicUrl} />;

        case EmailTemplates.ORDER_PLACED:
            if (!isOrderPlacedTemplateData(data)) {
                throw new MedusaError(
                    MedusaError.Types.INVALID_DATA,
                    `Invalid data for template "${EmailTemplates.ORDER_PLACED}"`,
                );
            }
            return <OrderPlacedTemplate {...data} publicUrl={publicUrl} />;

        case EmailTemplates.CONTACT_FORM:
            if (!isContactFormTemplateData(data)) {
                throw new MedusaError(
                    MedusaError.Types.INVALID_DATA,
                    `Invalid data for template "${EmailTemplates.CONTACT_FORM}"`,
                );
            }
            return <ContactFormEmail {...data} />;

        case EmailTemplates.PASSWORD_RESET:
            if (!isPasswordResetTemplateData(data)) {
                throw new MedusaError(
                    MedusaError.Types.INVALID_DATA,
                    `Invalid data for template "${EmailTemplates.PASSWORD_RESET}"`,
                );
            }
            return <PasswordResetEmail {...data} />;

        case EmailTemplates.CUSTOMER_CREATED:
            return (
                <CustomerCreatedEmail
                    firstName={data.firstName}
                    lastName={data.lastName}
                    publicUrl={publicUrl}
                />
            );

        case EmailTemplates.CUSTOMER_APPROVED:
            return (
                <CustomerApprovedEmail
                    firstName={data.firstName}
                    lastName={data.lastName}
                    publicUrl={publicUrl}
                />
            );

        case EmailTemplates.CUSTOMER_DECLINED:
            return (
                <CustomerDeclinedEmail
                    firstName={data.firstName}
                    lastName={data.lastName}
                    publicUrl={publicUrl}
                />
            );

        case EmailTemplates.PAYMENT_CAPTURED:
            return (
                <PaymentCapturedEmail
                    firstName={data.firstName}
                    lastName={data.lastName}
                    publicUrl={publicUrl}
                    orderId={data.orderId}
                    currency={data.currency}
                    amount={data.amount}
                />
            );

        case EmailTemplates.SHIPMENT_CREATED:
            return (
                <ShipmentCreatedEmail
                    firstName={data.firstName}
                    lastName={data.lastName}
                    publicUrl={publicUrl}
                    orderId={data.orderId}
                    labels={data.labels}
                />
            );

        case EmailTemplates.ORDER_CANCELED:
            return (
                <OrderCanceledEmail
                    firstName={data.firstName}
                    lastName={data.lastName}
                    orderId={data.orderId}
                    publicUrl={publicUrl}
                />
            );

        default:
            throw new MedusaError(
                MedusaError.Types.INVALID_DATA,
                `Unknown template key: "${templateKey}"`,
            );
    }
}

export { InviteUserEmail, OrderPlacedTemplate };
