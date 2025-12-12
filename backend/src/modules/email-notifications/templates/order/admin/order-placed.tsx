import * as React from 'react';
import { Base } from 'modules/email-notifications/templates/base';
import { Hr, Img, Section, Text } from '@react-email/components';
import { OrderAddressDTO, OrderDTO } from '@medusajs/framework/types';

export const ADMIN_ORDER_PLACED = 'admin-order-placed';

interface PreviewProps {
    order: OrderDTO & {
        display_id: string;
        summary: { raw_current_order_total: { value: number } };
    };
    shippingAddress: OrderAddressDTO;
    publicUrl: string;
}

export interface Props {
    order: OrderDTO & {
        display_id: string;
        summary: { raw_current_order_total: { value: number } };
    };
    shippingAddress: OrderAddressDTO;
    preview?: string;
    publicUrl: string;
}

const AdminOrderPlacedTemplate = ({
    order,
    shippingAddress,
    publicUrl,
    preview = `New order received – Order #${order.display_id}`,
}: Props & {
    PreviewProps: PreviewProps;
}) => {
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
                    New order received
                </Text>
                <Text>A new order has just been placed on the store.</Text>
                <Text>Please log in to the admin dashboard to review and process this order.</Text>
            </Section>
            <Hr style={{ margin: '20px 0' }} />
            <Section className="mt-4">
                <Text style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px' }}>
                    Order details
                </Text>
                <Text style={{ margin: '0 0 5px' }}>Order number: {order.display_id}</Text>
                <Text style={{ margin: '0 0 5px' }}>
                    Order date: {new Date(order.created_at).toLocaleDateString()}
                </Text>
                <Text style={{ margin: '0 0 5px' }}>
                    Customer name: {shippingAddress.first_name} {shippingAddress.last_name}
                </Text>
                <Text style={{ margin: '0 0 5px' }}>Customer email: {order.email}</Text>
                <Text style={{ margin: '0 0 20px' }}>
                    Total: {order.summary.raw_current_order_total.value} {order.currency_code}
                </Text>

                <Hr style={{ margin: '20px 0' }} />

                <Text style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px' }}>
                    Shipping address
                </Text>
                <Text style={{ margin: '0 0 5px' }}>{shippingAddress.address_1}</Text>
                <Text style={{ margin: '0 0 5px' }}>
                    {shippingAddress.city}, {shippingAddress.province} {shippingAddress.postal_code}
                </Text>
                <Text style={{ margin: '0 0 20px' }}>{shippingAddress.country_code}</Text>

                <Hr style={{ margin: '20px 0' }} />

                <Text style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 15px' }}>
                    Items ordered
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
                        <Text style={{ fontWeight: 'bold' }}>Item</Text>
                        <Text style={{ fontWeight: 'bold' }}>Quantity</Text>
                        <Text style={{ fontWeight: 'bold' }}>Price</Text>
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

AdminOrderPlacedTemplate.PreviewProps = {
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
} as PreviewProps;

export default AdminOrderPlacedTemplate;
