import { Text, Section, Hr } from '@react-email/components';
import { Base } from '../../base';
import { ContactForm } from '../../../../../lib/types';

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

export const ContactFormEmail = ({ first_name, last_name, email, phone, message }: Props) => {
    return (
        <Base preview={`New contact form message from ${first_name} ${last_name}`}>
            <Section>
                <Text className="text-black text-[16px] leading-[24px] font-bold">
                    New contact form submission
                </Text>
                <Hr />
                <Text className="text-black text-[14px] leading-[24px]">
                    You received a new message from:
                </Text>
                <Text className="text-black text-[14px] leading-[24px]">
                    <strong>Name:</strong> {first_name} {last_name}
                    <br />
                    <strong>Email:</strong> {email}
                    <br />
                    {phone && (
                        <>
                            <strong>Phone:</strong> {phone}
                            <br />
                        </>
                    )}
                </Text>
                <Hr />
                <Text className="text-black text-[14px] leading-[24px]">
                    <strong>Message:</strong>
                    <br />
                    {message}
                </Text>
            </Section>
        </Base>
    );
};
