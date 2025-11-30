import React from 'react';
import { Base } from 'modules/email-notifications/templates/base';
import { Img, Section, Text, Link } from '@react-email/components';
import { AdminFulfillmentLabel } from '@medusajs/types';

export const SHIPMENT_CREATED = 'shipment-created';

export interface Props {
    preview?: string;
    publicUrl?: string;
    firstName: string;
    lastName: string;
    labels: AdminFulfillmentLabel[];
    orderId: string | number;
}

const ShipmentCreatedEmail = ({
    publicUrl,
    firstName,
    lastName,
    labels,
    orderId,
    preview = 'Votre commande a été expédiée',
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
                    Commande expédiée
                </Text>
                <Text>
                    Bonjour {firstName} {lastName},
                </Text>
                <Text>
                    Nous vous informons que la commande n°{' '}
                    <span className="font-bold">{orderId}</span> de votre entreprise a été préparée
                    et expédiée.
                </Text>
                <Text>Vous pouvez suivre l’état de la livraison via le lien suivant :</Text>
                {labels.map(label => (
                    <Text key={label.id}>
                        <Link href={label.tracking_url}>{label.tracking_number}</Link>
                    </Text>
                ))}
                <Text>Pour toute question, n’hésitez pas à nous solliciter.</Text>
                <Text className="m-0">Cordialement,</Text>
                <Text className="m-0">L’équipe RSPI</Text>
            </Section>
        </Base>
    );
};

ShipmentCreatedEmail.PreviewProps = {
    publicUrl: 'https://bucket-production-654a.up.railway.app/public',
    firstName: 'Test',
    lastName: 'User',
    labels: [
        { tracking_number: 1234, tracking_url: 'http://tracking-url-link/' },
        { tracking_number: 1234, tracking_url: 'http://tracking-url-link/' },
    ],
    orderId: 1,
};

export default ShipmentCreatedEmail;
