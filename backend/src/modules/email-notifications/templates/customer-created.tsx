import { Base } from 'modules/email-notifications/templates/base';
import { Img, Section, Text } from '@react-email/components';
import * as React from 'react';

export const CUSTOMER_CREATED = 'customer-created';

export interface Props {
    preview?: string;
    publicUrl?: string;
    firstName: string;
    lastName: string;
}

export const CustomerCreatedEmail = ({
    publicUrl,
    firstName,
    lastName,
    preview = 'Confirmation de création de votre compte entreprise',
}: Props) => {
    return (
        <Base preview={preview}>
            <Section className="mt-[32px]">
                <Img src={`${publicUrl}/RSPI_logo_email.png`} alt="RSPI" className="mx-auto w-28" />
            </Section>
            <Section>
                <Text
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: '32px 0 32px',
                    }}
                >
                    Email d’inscription utilisateur
                </Text>
                <Text>
                    Bonjour {firstName} {lastName},
                </Text>
                <Text>
                    Nous vous confirmons la création du compte associé à votre entreprise sur notre
                    plateforme. Vous pouvez désormais accéder à votre espace professionnel et
                    utiliser l’ensemble des services mis à votre disposition.
                </Text>
                <Text>Pour toute question, notre équipe reste à votre écoute.</Text>
                <Text className="m-0">Cordialement,</Text>
                <Text className="m-0">L’équipe RSPI</Text>
            </Section>
        </Base>
    );
};

CustomerCreatedEmail.PreviewProps = {
    publicUrl: 'https://bucket-production-654a.up.railway.app/public',
    firstName: 'Test',
    lastName: 'User',
};

export default CustomerCreatedEmail;
