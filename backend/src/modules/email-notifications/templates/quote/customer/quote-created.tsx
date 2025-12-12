import { Text, Section, Hr, Img } from '@react-email/components';
import * as React from 'react';
import { Base } from '../../base';
import { OrderDTO, OrderAddressDTO } from '@medusajs/framework/types';

export const QUOTE_CREATED = 'quote-created';

interface QuoteCreatedPreviewProps {
    order: OrderDTO & {
        display_id: string;
        summary: { raw_current_order_total: { value: number } };
    };
    shippingAddress: OrderAddressDTO;
    publicUrl: string;
}

export interface QuoteCreatedTemplateProps {
    order: OrderDTO & {
        display_id: string;
        summary: { raw_current_order_total: { value: number } };
    };
    shippingAddress: OrderAddressDTO;
    preview?: string;
    publicUrl: string;
}

const QuoteCreatedEmail: React.FC<QuoteCreatedTemplateProps> & {
    PreviewProps: QuoteCreatedPreviewProps;
} = ({ order, shippingAddress, publicUrl, preview = 'Confirmation de votre devis' }) => {
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
                    Devis créé avec succès
                </Text>
                <Text>
                    Bonjour {shippingAddress.first_name} {shippingAddress.last_name},
                </Text>
                <Text>
                    Votre demande de devis n° <span className="font-bold">{order.display_id}</span>{' '}
                    a été créée avec succès.
                </Text>
                <Text>
                    Notre équipe RSPI procède actuellement au calcul des frais de livraison. Vous
                    recevrez un e-mail dès que le montant des frais de livraison aura été déterminé.
                </Text>
                <Text>
                    Une fois le devis finalisé, vous pourrez vous connecter à votre compte afin de
                    consulter et accepter le devis.
                </Text>
                <Text>Nous vous remercions pour votre confiance.</Text>
                <Text className="m-0">Cordialement,</Text>
                <Text className="m-0">L’équipe RSPI</Text>
            </Section>
            <Hr style={{ margin: '20px 0' }} />
            <Section className="mt-4">
                <Text style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px' }}>
                    Résumé du devis
                </Text>
                <Text style={{ margin: '0 0 5px' }}>Numéro de devis: {order.display_id}</Text>
                <Text style={{ margin: '0 0 5px' }}>
                    Date de création: {new Date(order.created_at).toLocaleDateString()}
                </Text>
                <Text style={{ margin: '0 0 20px' }}>
                    Total (hors frais de livraison): {order.summary.raw_current_order_total.value}{' '}
                    {order.currency_code}
                </Text>

                <Hr style={{ margin: '20px 0' }} />

                <Text style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px' }}>
                    Adresse de livraison
                </Text>
                <Text style={{ margin: '0 0 5px' }}>{shippingAddress.address_1}</Text>
                <Text style={{ margin: '0 0 5px' }}>
                    {shippingAddress.city}, {shippingAddress.province} {shippingAddress.postal_code}
                </Text>
                <Text style={{ margin: '0 0 20px' }}>{shippingAddress.country_code}</Text>

                <Hr style={{ margin: '20px 0' }} />

                <Text style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 15px' }}>
                    Articles demandés
                </Text>

                <div
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        border: '1px solid #ddd',
                        margin: '10px 0',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            backgroundColor: '#f2f2f2',
                            padding: '8px',
                            borderBottom: '1px solid #ddd',
                        }}
                    >
                        <Text style={{ fontWeight: 'bold' }}>Article</Text>
                        <Text style={{ fontWeight: 'bold' }}>Quantité</Text>
                        <Text style={{ fontWeight: 'bold' }}>Prix</Text>
                    </div>
                    {order.items.map(item => (
                        <div
                            key={item.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '8px',
                                borderBottom: '1px solid #ddd',
                            }}
                        >
                            <Text>
                                {item.title} - {item.product_title}
                            </Text>
                            <Text>{item.quantity}</Text>
                            <Text>
                                {item.unit_price} {order.currency_code}
                            </Text>
                        </div>
                    ))}
                </div>
            </Section>
        </Base>
    );
};

QuoteCreatedEmail.PreviewProps = {
    publicUrl: 'https://bucket-production-654a.up.railway.app/public',
    order: {
        id: 'test-order-id',
        display_id: 'ORD-123',
        created_at: new Date().toISOString(),
        email: 'test@example.com',
        currency_code: 'USD',
        items: [
            {
                id: 'item-1',
                title: 'Item 1',
                product_title: 'Product 1',
                quantity: 2,
                unit_price: 10,
            },
            {
                id: 'item-2',
                title: 'Item 2',
                product_title: 'Product 2',
                quantity: 1,
                unit_price: 25,
            },
        ],
        shipping_address: {
            first_name: 'Test',
            last_name: 'User',
            address_1: '123 Main St',
            city: 'Anytown',
            province: 'CA',
            postal_code: '12345',
            country_code: 'US',
        },
        summary: { raw_current_order_total: { value: 45 } },
    },
    shippingAddress: {
        first_name: 'Test',
        last_name: 'User',
        address_1: '123 Main St',
        city: 'Anytown',
        province: 'CA',
        postal_code: '12345',
        country_code: 'US',
    },
} as QuoteCreatedPreviewProps;

export default QuoteCreatedEmail;
