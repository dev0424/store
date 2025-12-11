import { Base } from 'modules/email-notifications/templates/base';
import { Button, Img, Section, Text } from '@react-email/components';
import * as React from 'react';

export const SHIPPING_ADDED = 'shipping-added';

export interface Props {
    preview?: string;
    publicUrl?: string;
    firstName: string;
    lastName: string;
    orderId: string;
    loginUrl: string;
}

const ShippingAddedEmail = ({
    publicUrl,
    firstName,
    lastName,
    orderId,
    loginUrl,
    preview = 'Mise à jour de votre devis',
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
                    Mise à jour de votre devis
                </Text>
                <Text>
                    Bonjour {firstName} {lastName},
                </Text>
                <Text>
                    Nous avons le plaisir de vous informer que notre équipe RSPI a terminé le calcul
                    des frais de livraison pour votre devis n°{' '}
                    <span className="font-bold">{orderId}</span>.
                </Text>
                <Text>
                    Vous pouvez désormais vous connecter à votre compte pour consulter le devis mis
                    à jour. Si tout vous convient, vous aurez la possibilité d’accepter le devis
                    afin de finaliser votre commande.
                </Text>
                <Section className="text-center mt-[32px] mb-[32px]">
                    <Button
                        className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                        href={loginUrl}
                    >
                        Se connecter
                    </Button>
                </Section>
                <Text>Nous restons à votre disposition pour toute question supplémentaire.</Text>
                <Text className="m-0">Cordialement,</Text>
                <Text className="m-0">L’équipe RSPI</Text>
            </Section>
        </Base>
    );
};

ShippingAddedEmail.PreviewProps = {
    publicUrl: 'https://bucket-production-654a.up.railway.app/public',
    firstName: 'Test',
    lastName: 'User',
    orderId: 1,
    loginUrl: 'http://localhost:8000/account',
};

export default ShippingAddedEmail;
