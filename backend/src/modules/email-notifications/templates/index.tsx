import { ReactNode } from 'react';
import { MedusaError } from '@medusajs/framework/utils';
import { InviteUserEmail, INVITE_USER, isInviteUserData } from './invite-user';
import { OrderPlacedTemplate, ORDER_PLACED, isOrderPlacedTemplateData } from './order-placed';
import { CONTACT_FORM, ContactFormEmail, isContactFormTemplateData } from './contact-form';
import PasswordResetEmail, { isPasswordResetTemplateData, PASSWORD_RESET } from './password-reset';
import { CUSTOMER_CREATED, CustomerCreatedEmail, isCustomerCreatedData } from './customer-created';

export const EmailTemplates = {
    INVITE_USER,
    ORDER_PLACED,
    CONTACT_FORM,
    PASSWORD_RESET,
    CUSTOMER_CREATED,
} as const;

export type EmailTemplateType = keyof typeof EmailTemplates;

export function generateEmailTemplate(
    templateKey: string,
    data: unknown,
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
            if (!isCustomerCreatedData(data)) {
                throw new MedusaError(
                    MedusaError.Types.INVALID_DATA,
                    `Invalid data for template "${EmailTemplates.CUSTOMER_CREATED}"`,
                );
            }
            return <CustomerCreatedEmail {...data} publicUrl={publicUrl} />;

        default:
            throw new MedusaError(
                MedusaError.Types.INVALID_DATA,
                `Unknown template key: "${templateKey}"`,
            );
    }
}

export { InviteUserEmail, OrderPlacedTemplate };
