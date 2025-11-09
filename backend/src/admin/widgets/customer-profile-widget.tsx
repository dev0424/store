import React from 'react';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { Container, Heading, Text } from '@medusajs/ui';
import { SectionRow } from '../components/SectionRow';
import { AdminCustomer, DetailWidgetProps } from '@medusajs/types';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { AdminCustomerExtended } from '../../lib/types';

const CustomerProfileWidget = ({ data: customer }: DetailWidgetProps<AdminCustomer>) => {
    const {
        data: customerData,
        isLoading,
        refetch: refreshCustomer,
    } = useQuery({
        queryFn: () =>
            sdk.admin.customer.retrieve(customer.id, {
                fields: '+bank_account.*,+billing_address.*,+customer_profile.*',
            }) as Promise<AdminCustomerExtended>,
        queryKey: [['customer', customer.id, 'custom']],
    });

    if (isLoading) {
        return (
            <Container className="p-0">
                <div className="flex flex-col divide-y">
                    <Heading level="h2" className="px-6 py-4">
                        Customer profile
                    </Heading>
                    <Text className="px-6 py-4">Loading...</Text>
                </div>
            </Container>
        );
    }

    return (
        <Container className="divide-y p-0">
            <div className="flex justify-between items-center px-6 py-4">
                <Heading level="h2">Customer profile</Heading>
            </div>
            <SectionRow
                title="VAT number"
                value={customerData.customer.customer_profile.vat_number}
            />
            <SectionRow
                title="SIRET number"
                value={customerData.customer.customer_profile.siret_number}
            />
            <SectionRow title="APE code" value={customerData.customer.customer_profile.ape_code} />
            <SectionRow title="Activity" value={customerData.customer.customer_profile.activity} />
            <SectionRow
                title="Billing cycle"
                value={customerData.customer.customer_profile.billing_cycle}
            />
            <SectionRow
                title="Payment method"
                value={customerData.customer.customer_profile.payment_method}
            />
            <SectionRow
                title="Invoice email"
                value={customerData.customer.customer_profile.invoice_email}
            />
        </Container>
    );
};

export const config = defineWidgetConfig({
    zone: 'customer.details.after',
});

export default CustomerProfileWidget;
