import { Base } from 'modules/email-notifications/templates/base';
import { Img, Section, Text } from '@react-email/components';
import * as React from 'react';

export const ORDER_CANCELED = 'order-canceled';

export interface Props {
    preview?: string;
    publicUrl?: string;
    firstName: string;
    lastName: string;
    orderId: string | number;
}

const OrderCanceledEmail = ({
    publicUrl,
    firstName,
    lastName,
    orderId,
    preview = 'Annulation de votre commande',
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
                    Commande annulée
                </Text>
                <Text>
                    Bonjour {firstName} {lastName},
                </Text>
                <Text>
                    Votre commande n° <span className="font-bold">{orderId}</span> a été annulée.
                </Text>
                <Text>
                    Si un règlement avait été effectué, votre remboursement sera initié dans les
                    meilleurs délais.
                </Text>
                <Text>Nous restons disponibles pour toute assistance ou nouvelle commande.</Text>
                <Text className="m-0">Cordialement,</Text>
                <Text className="m-0">L’équipe RSPI</Text>
            </Section>
        </Base>
    );
};

OrderCanceledEmail.PreviewProps = {
    publicUrl: 'https://bucket-production-654a.up.railway.app/public',
    firstName: 'Test',
    lastName: 'User',
    orderId: 1,
};

export default OrderCanceledEmail;
