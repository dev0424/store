import React from 'react';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { Container, Heading, Text } from '@medusajs/ui';
import { SectionRow } from '../components/SectionRow';
import { AdminCustomer, DetailWidgetProps } from '@medusajs/types';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { AdminCustomerExtended } from '../../lib/types';
import UpdateCustomerProfile from './components/customer/customer-profile/update-customer-profile';
import { Spinner } from '@medusajs/icons';

const CustomerProfileWidget = ({ data: customer }: DetailWidgetProps<AdminCustomer>) => {
    const {
        data: customerData,
        isLoading,
        refetch: refreshCustomer,
    } = useQuery({
        queryFn: () =>
            sdk.admin.customer.retrieve(customer.id, {
                fields: '+bank_account.*,+customer_profile.*,+account_status.*,+location.*,+documents.*,+account_group.*,+contacts.*',
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
                    <div className="w-full flex items-center justify-center p-4">
                        <Spinner className="text-ui-fg-interactive animate-spin" />
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container className="divide-y p-0">
            <div className="flex justify-between items-center px-6 py-4">
                <Heading level="h2">Customer profile</Heading>
                <UpdateCustomerProfile
                    customerProfile={customerData.customer.customer_profile}
                    onSuccess={refreshCustomer}
                    customerId={customer.id}
                />
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
            <SectionRow
                title="Revenue previous year"
                value={customerData.customer.customer_profile.revenue_previous_year}
            />
            <SectionRow
                title="Number of employees"
                value={customerData.customer.customer_profile.employee_count}
            />
        </Container>
    );
};

export const config = defineWidgetConfig({
    zone: 'customer.details.after',
});

export default CustomerProfileWidget;
