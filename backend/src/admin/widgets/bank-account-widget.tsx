import React from 'react';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { Container, Heading, Text } from '@medusajs/ui';
import { SectionRow } from '../components/SectionRow';
import { AdminCustomer, DetailWidgetProps } from '@medusajs/types';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { AdminCustomerExtended } from '../../lib/types';
import UpdateBankAccount from './components/update-bank-account';

const BankAccountWidget = ({ data: customer }: DetailWidgetProps<AdminCustomer>) => {
    const {
        data: customerData,
        isLoading,
        refetch: refreshCustomer,
    } = useQuery({
        queryFn: () =>
            sdk.admin.customer.retrieve(customer.id, {
                fields: '+bank_account.*,+customer_profile.*,+account_status.*,+location.*,+documents.*,+account_group.*',
            }) as Promise<AdminCustomerExtended>,
        queryKey: [['customer', customer.id, 'custom']],
    });

    if (isLoading) {
        return (
            <Container className="p-0">
                <div className="flex flex-col divide-y">
                    <Heading level="h2" className="px-6 py-4">
                        Bank account
                    </Heading>
                    <Text className="px-6 py-4">Loading...</Text>
                </div>
            </Container>
        );
    }

    return (
        <Container className="divide-y p-0">
            <div className="flex justify-between items-center px-6 py-4">
                <Heading level="h2">Bank account</Heading>
                <UpdateBankAccount
                    onSuccess={refreshCustomer}
                    bankAccount={customerData.customer.bank_account}
                />
            </div>
            <SectionRow title="Bank name" value={customerData.customer.bank_account.bank_name} />
            <SectionRow title="Bank code" value={customerData.customer.bank_account.bank_code} />
            <SectionRow
                title="Branch code"
                value={customerData.customer.bank_account.branch_code}
            />
            <SectionRow title="City" value={customerData.customer.bank_account.city} />
            <SectionRow title="Address" value={customerData.customer.bank_account.address} />
            <SectionRow
                title="Account number"
                value={customerData.customer.bank_account.account_number}
            />
            <SectionRow
                title="Account holder"
                value={customerData.customer.bank_account.account_holder}
            />
            <SectionRow title="IBAN" value={customerData.customer.bank_account.iban} />
            <SectionRow title="BIC" value={customerData.customer.bank_account.bic} />
            <SectionRow title="RIB key" value={customerData.customer.bank_account.rib_key} />
        </Container>
    );
};

export const config = defineWidgetConfig({
    zone: 'customer.details.after',
});

export default BankAccountWidget;
