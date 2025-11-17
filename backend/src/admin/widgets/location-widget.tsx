import React from 'react';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { AdminCustomer, DetailWidgetProps } from '@medusajs/types';
import { Container, Heading, Text } from '@medusajs/ui';
import { SectionRow } from '../components/SectionRow';
import UpdateLocation from './components/update-location';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { AdminCustomerExtended } from 'lib/types';

const LocationWidget = ({ data: customer }: DetailWidgetProps<AdminCustomer>) => {
    const {
        data: customerData,
        isLoading,
        refetch: refreshCustomer,
    } = useQuery({
        queryFn: () =>
            sdk.admin.customer.retrieve(customer.id, {
                fields: '+bank_account.*,+customer_profile.*,+account_status.*,+location.*',
            }) as Promise<AdminCustomerExtended>,
        queryKey: [['customer', customer.id, 'custom']],
    });

    if (isLoading) {
        return (
            <Container className="p-0">
                <div className="flex flex-col divide-y">
                    <Heading level="h2" className="px-6 py-4">
                        Location
                    </Heading>
                    <Text className="px-6 py-4">Loading...</Text>
                </div>
            </Container>
        );
    }

    return (
        <Container className="divide-y p-0">
            <div className="flex justify-between items-center px-6 py-4">
                <Heading level="h2">Location</Heading>
                <UpdateLocation
                    location={customerData.customer.location}
                    onSuccess={refreshCustomer}
                />
            </div>
            <SectionRow
                title="Latitude"
                value={customerData.customer.location.latitude || 'Not set'}
            />
            <SectionRow
                title="Longitude"
                value={customerData.customer.location.longitude || 'Not set'}
            />
        </Container>
    );
};

export const config = defineWidgetConfig({
    zone: 'customer.details.after',
});

export default LocationWidget;
