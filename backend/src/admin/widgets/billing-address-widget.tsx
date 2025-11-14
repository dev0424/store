import React from 'react';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { Container, Heading, Text } from '@medusajs/ui';
import { SectionRow } from '../components/SectionRow';
import { AdminCustomer, DetailWidgetProps } from '@medusajs/types';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { AdminCustomerExtended } from '../../lib/types';

const BillingAddressWidget = ({ data: customer }: DetailWidgetProps<AdminCustomer>) => {
    const {
        data: customerData,
        isLoading,
        refetch: refreshCustomer,
    } = useQuery({
        queryFn: () =>
            sdk.admin.customer.retrieve(customer.id, {
                fields: '+bank_account.*,+billing_address.*,+customer_profile.*,+account_status.*',
            }) as Promise<AdminCustomerExtended>,
        queryKey: [['customer', customer.id, 'custom']],
    });

    if (isLoading) {
        return (
            <Container className="p-0">
                <div className="flex flex-col divide-y">
                    <Heading level="h2" className="px-6 py-4">
                        Billing address
                    </Heading>
                    <Text className="px-6 py-4">Loading...</Text>
                </div>
            </Container>
        );
    }

    return (
        <Container className="divide-y p-0">
            <div className="flex justify-between items-center px-6 py-4">
                <Heading level="h2">Billing address</Heading>
            </div>
            <SectionRow title="Address 1" value={customerData.customer.billing_address.address_1} />
            <SectionRow
                title="Address 2"
                value={customerData.customer.billing_address.address_2 || '-'}
            />
            <SectionRow
                title="Postal code"
                value={customerData.customer.billing_address.postal_code}
            />
            <SectionRow title="City" value={customerData.customer.billing_address.city} />
            <SectionRow
                title="Country"
                value={customerData.customer.billing_address.country_code}
            />
            <SectionRow
                title="Province"
                value={customerData.customer.billing_address.province || '-'}
            />
        </Container>
    );
};

export const config = defineWidgetConfig({
    zone: 'customer.details.after',
});

export default BillingAddressWidget;
