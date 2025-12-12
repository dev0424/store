import { Base } from 'modules/email-notifications/templates/base';
import { Img, Section, Text } from '@react-email/components';
import * as React from 'react';

export const CUSTOMER_APPROVED = 'customer-approved';

export interface Props {
    preview?: string;
    publicUrl?: string;
    firstName: string;
    lastName: string;
}

export const CustomerApprovedEmail = ({
    publicUrl,
    firstName,
    lastName,
    preview = 'Approbation de votre demande d’inscription',
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
                    Application acceptée
                </Text>
                <Text>
                    Bonjour {firstName} {lastName},
                </Text>
                <Text>
                    Nous vous informons que la demande d’inscription de votre entreprise a été
                    examinée et validée.
                </Text>
                <Text>
                    Vous pouvez à présent accéder à votre espace professionnel et débuter
                    l’utilisation de nos services.
                </Text>
                <Text>Nous vous remercions de la confiance accordée à RSPI.</Text>
                <Text className="m-0">Cordialement,</Text>
                <Text className="m-0">L’équipe RSPI</Text>
            </Section>
        </Base>
    );
};

CustomerApprovedEmail.PreviewProps = {
    publicUrl: 'https://bucket-production-654a.up.railway.app/public',
    firstName: 'Test',
    lastName: 'User',
};

export default CustomerApprovedEmail;
