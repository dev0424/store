import { ReactNode } from 'react';
import { MedusaError } from '@medusajs/framework/utils';
import { InviteUserEmail, INVITE_USER, isInviteUserData } from './invite-user';
import { OrderPlacedTemplate, ORDER_PLACED, isOrderPlacedTemplateData } from './order-placed';
import { CONTACT_FORM, ContactFormEmail, isContactFormTemplateData } from './contact-form';
import PasswordResetEmail, { isPasswordResetTemplateData, PASSWORD_RESET } from './password-reset';
import { CUSTOMER_CREATED, CustomerCreatedEmail } from './customer-created';
import CustomerApprovedEmail, { CUSTOMER_APPROVED } from './customer-approved';
import CustomerDeclinedEmail, { CUSTOMER_DECLINED } from './customer-declined';

export const EmailTemplates = {
    INVITE_USER,
    ORDER_PLACED,
    CONTACT_FORM,
    PASSWORD_RESET,
    CUSTOMER_CREATED,
    CUSTOMER_APPROVED,
    CUSTOMER_DECLINED,
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

        default:
            throw new MedusaError(
                MedusaError.Types.INVALID_DATA,
                `Unknown template key: "${templateKey}"`,
            );
    }
}

export { InviteUserEmail, OrderPlacedTemplate };
