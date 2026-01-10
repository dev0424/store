import React from 'react';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { Container, Heading, Text } from '@medusajs/ui';
import { AdminCustomer, DetailWidgetProps } from '@medusajs/types';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { Spinner } from '@medusajs/icons';

const AddressesWidget = ({ data: customer }: DetailWidgetProps<AdminCustomer>) => {
    const {
        data: customerData,
        isLoading,
        refetch: refreshCustomer,
    } = useQuery({
        queryFn: () =>
            sdk.client.fetch<AdminCustomer>(`/admin/customers/${customer.id}/addresses`, {
                method: 'GET',
                query: {
                    fields: 'id,address_name,is_default_shipping,is_default_billing,address_1,address_2,city,country_code,province,postal_code,phone',
                },
            }),
        queryKey: [['customer-address', customer.id]],
    });

    if (isLoading) {
        return (
            <Container className="p-0">
                <div className="flex flex-col divide-y">
                    <Heading level="h2" className="px-6 py-4">
                        Addresses
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
                <Heading level="h2">Addresses</Heading>
            </div>
            <div className="p-4 grid grid-cols-3 gap-4">
                {customerData.addresses.map(address => (
                    <div
                        key={address.id}
                        className="shadow-elevation-card-rest p-4 rounded-md flex flex-col gap-4"
                    >
                        <Text size="small" leading="normal" weight="plus">
                            {address.address_name}
                        </Text>
                        <div className="grid grid-cols-2 gap-2">
                            <Text size="small" leading="normal">
                                Address 1
                            </Text>
                            <Text size="small" leading="compact">
                                {address.address_1}
                            </Text>
                            <Text size="small" leading="compact">
                                Address 2
                            </Text>
                            <Text size="small" leading="compact">
                                {address.address_2}
                            </Text>
                            <Text size="small" leading="compact">
                                Postal code
                            </Text>
                            <Text size="small" leading="compact">
                                {address.postal_code}
                            </Text>
                            <Text size="small" leading="compact">
                                City
                            </Text>
                            <Text size="small" leading="compact">
                                {address.city}
                            </Text>
                            <Text size="small" leading="compact">
                                Country code
                            </Text>
                            <Text size="small" leading="compact">
                                {address.country_code}
                            </Text>
                            <Text size="small" leading="compact">
                                Province
                            </Text>
                            <Text size="small" leading="compact">
                                {address.province || '-'}
                            </Text>
                            <Text size="small" leading="compact">
                                Phone
                            </Text>
                            <Text size="small" leading="compact">
                                {address.phone || '-'}
                            </Text>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export const config = defineWidgetConfig({
    zone: 'customer.details.after',
});

export default AddressesWidget;
