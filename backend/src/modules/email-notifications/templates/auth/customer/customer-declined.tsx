import { Base } from 'modules/email-notifications/templates/base';
import { Img, Section, Text } from '@react-email/components';
import * as React from 'react';

export const CUSTOMER_DECLINED = 'customer-declined';

export interface Props {
    preview?: string;
    publicUrl?: string;
    firstName: string;
    lastName: string;
}

export const CustomerDeclinedEmail = ({
    publicUrl,
    firstName,
    lastName,
    preview = 'Mise à jour concernant votre demande d’inscription',
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
                    Application refusée
                </Text>
                <Text>
                    Bonjour {firstName} {lastName},
                </Text>
                <Text>
                    Suite à l’analyse de votre dossier, nous vous informons que la demande
                    d’inscription de votre entreprise n’a pas été retenue.
                </Text>
                <Text>
                    Si vous souhaitez obtenir des précisions ou procéder à une nouvelle demande
                    ultérieurement, notre équipe reste à votre disposition.
                </Text>
                <Text className="m-0">Cordialement,</Text>
                <Text className="m-0">L’équipe RSPI</Text>
            </Section>
        </Base>
    );
};

CustomerDeclinedEmail.PreviewProps = {
    publicUrl: 'https://bucket-production-654a.up.railway.app/public',
    firstName: 'Test',
    lastName: 'User',
};

export default CustomerDeclinedEmail;
