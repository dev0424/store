import { Text } from '@react-email/components';
import { Base } from './base';
import { ContactForm } from '../../../lib/types';

export const CONTACT_FORM = 'contact-form';

type Props = {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    message: string;
};

export const isContactFormTemplateData = (data: any): data is ContactForm =>
    typeof data.first_name === 'string' &&
    typeof data.last_name === 'string' &&
    typeof data.email === 'string' &&
    typeof data.message === 'string';

export const ContactFormEmail = ({ first_name, last_name, email, message }: Props) => {
    return (
        <Base preview={'preview'}>
            <Text className="text-black text-[14px] leading-[24px]">
                You received a new message from ${first_name} ${last_name}, ${email}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">Message: ${message}</Text>
        </Base>
    );
};
