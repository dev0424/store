import React from 'react';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { AdminCustomer, DetailWidgetProps } from '@medusajs/types';
import { Container, Heading } from '@medusajs/ui';
import { SectionRow } from '../components/SectionRow';
import UpdateLocation from './components/customer/location/update-location';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { AdminCustomerExtended } from 'lib/types';
import { Spinner } from '@medusajs/icons';

const LocationWidget = ({ data: customer }: DetailWidgetProps<AdminCustomer>) => {
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
                        Store location
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
                <Heading level="h2">Store location</Heading>
                <UpdateLocation
                    location={customerData.customer.location}
                    onSuccess={refreshCustomer}
                    customerId={customer.id}
                />
            </div>
            <SectionRow title="Latitude" value={customerData.customer.location.latitude} />
            <SectionRow title="Longitude" value={customerData.customer.location.longitude} />
            <SectionRow title="Address 1" value={customerData.customer.location.address_1} />
            <SectionRow title="Address 2" value={customerData.customer.location.address_2} />
            <SectionRow title="City" value={customerData.customer.location.city} />
            <SectionRow title="Country code" value={customerData.customer.location.country_code} />
            <SectionRow title="Province" value={customerData.customer.location.province} />
            <SectionRow title="Postal code" value={customerData.customer.location.postal_code} />
            <SectionRow title="Phone" value={customerData.customer.location.phone} />
            <SectionRow title="Email" value={customerData.customer.location.email} />
        </Container>
    );
};

export const config = defineWidgetConfig({
    zone: 'customer.details.after',
});

export default LocationWidget;
