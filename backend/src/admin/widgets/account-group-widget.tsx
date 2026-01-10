import React from 'react';
import { AdminCustomer, DetailWidgetProps } from '@medusajs/types';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { AdminCustomerExtended } from 'lib/types';
import { Container, Heading, Text } from '@medusajs/ui';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { SectionRow } from '../components/SectionRow';
import { Spinner } from '@medusajs/icons';
import UpdateAccountGroup from './components/customer/account-group/update-account-group';

const AccountGroupWidget = ({ data: customer }: DetailWidgetProps<AdminCustomer>) => {
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
                        Account group
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
                <Heading level="h2">Account group</Heading>
                <UpdateAccountGroup
                    customerId={customerData.customer.id}
                    onSuccess={refreshCustomer}
                    accountGroup={customerData.customer.account_group}
                />
            </div>
            <SectionRow
                title="Centralized billing"
                value={
                    customerData.customer.account_group.is_centralized_billing ? 'true' : 'false'
                }
            />
            <SectionRow
                title="Corporate status"
                value={customerData.customer.account_group.corporate_status}
            />
            <SectionRow
                title="Purchasing group member"
                value={
                    customerData.customer.account_group.is_purchasing_group_member
                        ? 'true'
                        : 'false'
                }
            />
            <SectionRow
                title="Purchasing group name"
                value={customerData.customer.account_group.purchasing_group_name}
            />
            <SectionRow
                title="Membership number"
                value={customerData.customer.account_group.membership_number}
            />
            <SectionRow
                title="Agency or branch"
                value={customerData.customer.account_group.is_agency_or_branch ? 'true' : 'false'}
            />
            <SectionRow
                title="Parent group name"
                value={customerData.customer.account_group.parent_group_name}
            />
            <SectionRow
                title="Platform client"
                value={customerData.customer.account_group.is_platform_client ? 'true' : 'false'}
            />
            <SectionRow
                title="Platform name"
                value={customerData.customer.account_group.platform_name}
            />
        </Container>
    );
};

export const config = defineWidgetConfig({
    zone: 'customer.details.after',
});

export default AccountGroupWidget;
