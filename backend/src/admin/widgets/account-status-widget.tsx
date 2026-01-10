import React from 'react';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { Container, Heading, StatusBadge, Text } from '@medusajs/ui';
import { SectionRow } from '../components/SectionRow';
import UpdateAccountStatus from './components/customer/account-status/update-account-status';
import { AdminCustomer, DetailWidgetProps } from '@medusajs/types';
import { APPLICATION_STATUS_METADATA } from '../widgets/constants';
import { AdminCustomerExtended } from '../../lib/types';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { Spinner } from '@medusajs/icons';

const AccountStatusWidget = ({ data: customer }: DetailWidgetProps<AdminCustomer>) => {
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
                        Account status
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
                <Heading level="h2">Account status</Heading>
                <div className="flex items-center gap-x-1">
                    <StatusBadge
                        color={
                            APPLICATION_STATUS_METADATA[
                                customerData.customer.account_status.application_status
                            ].color
                        }
                    >
                        {
                            APPLICATION_STATUS_METADATA[
                                customerData.customer.account_status.application_status
                            ].label
                        }
                    </StatusBadge>
                    <UpdateAccountStatus
                        customerId={customerData.customer.id}
                        accountStatus={customerData.customer.account_status}
                        onSuccess={refreshCustomer}
                    />
                </div>
            </div>
            <SectionRow
                title="Status"
                value={
                    APPLICATION_STATUS_METADATA[
                        customerData.customer.account_status.application_status
                    ].label
                }
            />
            <SectionRow
                title="Show in distributor list"
                value={customerData.customer.account_status.is_searchable ? 'true' : 'false'}
            />
        </Container>
    );
};

export const config = defineWidgetConfig({
    zone: 'customer.details.side.before',
});

export default AccountStatusWidget;
