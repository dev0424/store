import { Base } from 'modules/email-notifications/templates/base';
import { Img, Section, Text } from '@react-email/components';
import * as React from 'react';

export const PAYMENT_CAPTURED = 'payment-captured';

export interface Props {
    preview?: string;
    publicUrl?: string;
    firstName: string;
    lastName: string;
    amount: number;
    currency: string;
    orderId: string | number;
}

export const PaymentCapturedEmail = ({
    publicUrl,
    firstName,
    lastName,
    amount,
    currency,
    orderId,
    preview = 'Confirmation de réception de votre paiement',
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
                    Paiement réussi
                </Text>
                <Text>
                    Bonjour {firstName} {lastName},
                </Text>
                <Text>
                    Nous vous confirmons la bonne réception du paiement d’un montant de{' '}
                    <span className="font-bold">
                        {amount} {currency}
                    </span>{' '}
                    relatif à votre commande n° <span className="font-bold">{orderId}</span>.
                </Text>
                <Text>
                    Le récapitulatif de la transaction est disponible dans votre espace
                    professionnel.
                </Text>
                <Text>Nous vous remercions pour votre règlement.</Text>
                <Text className="m-0">Cordialement,</Text>
                <Text className="m-0">L’équipe RSPI</Text>
            </Section>
        </Base>
    );
};

PaymentCapturedEmail.PreviewProps = {
    publicUrl: 'https://bucket-production-654a.up.railway.app/public',
    firstName: 'Test',
    lastName: 'User',
    amount: 100,
    currency: 'eur',
    orderId: 1,
};

export default PaymentCapturedEmail;
