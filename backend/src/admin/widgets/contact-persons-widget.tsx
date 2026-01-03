import React from 'react';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { Container, Heading, Text } from '@medusajs/ui';
import { AdminCustomer, DetailWidgetProps } from '@medusajs/types';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { AdminCustomerExtended } from 'lib/types';
import { Spinner } from '@medusajs/icons';

const ContactPersonsWidget = ({ data: customer }: DetailWidgetProps<AdminCustomer>) => {
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
                        Contact persons
                    </Heading>
                    <div className="w-full flex items-center justify-center p-4">
                        <Spinner className="text-ui-fg-interactive animate-spin" />
                    </div>
                </div>
            </Container>
        );
    }

    if (!customerData.customer.contacts.length) {
        return (
            <Container className="divide-y p-0">
                <div className="flex justify-between items-center px-6 py-4">
                    <Heading level="h2">Contact persons</Heading>
                </div>
                <div className="py-4 px-6 w-full text-center">
                    <Text>This customer has no contact persons.</Text>
                </div>
            </Container>
        );
    }

    return (
        <Container className="divide-y p-0">
            <div className="flex justify-between items-center px-6 py-4">
                <Heading level="h2">Contact persons</Heading>
            </div>
            <div className="p-4 grid grid-cols-3 gap-4">
                {customerData.customer.contacts.map(contactPerson => (
                    <div
                        key={contactPerson.id}
                        className="shadow-elevation-card-rest p-4 rounded-md flex flex-col gap-4"
                    >
                        <Text size="small" leading="normal" weight="plus" className="capitalize">
                            {contactPerson.role}
                        </Text>
                        <div className="grid grid-cols-2 gap-2">
                            <Text size="small" leading="compact">
                                Title
                            </Text>
                            <Text size="small" leading="compact">
                                {contactPerson.title}
                            </Text>
                            <Text size="small" leading="normal">
                                First name
                            </Text>
                            <Text size="small" leading="compact">
                                {contactPerson.first_name}
                            </Text>
                            <Text size="small" leading="compact">
                                Last name
                            </Text>
                            <Text size="small" leading="compact">
                                {contactPerson.last_name}
                            </Text>
                            <Text size="small" leading="compact">
                                Phone
                            </Text>
                            <Text size="small" leading="compact">
                                {contactPerson.phone}
                            </Text>
                            <Text size="small" leading="compact">
                                Email
                            </Text>
                            <Text size="small" leading="compact">
                                {contactPerson.email}
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

export default ContactPersonsWidget;
