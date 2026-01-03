import React from 'react';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { Container, Heading, Text } from '@medusajs/ui';
import { AdminCustomer, DetailWidgetProps } from '@medusajs/types';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import { AdminCustomerExtended } from '../../lib/types';
import { findDocument } from '../../lib/utils';
import { Spinner } from '@medusajs/icons';

const CustomerDocumentsWidget = ({ data: customer }: DetailWidgetProps<AdminCustomer>) => {
    const { data: customerData, isLoading } = useQuery({
        queryFn: () =>
            sdk.admin.customer.retrieve(customer.id, {
                fields: '+bank_account.*,+customer_profile.*,+account_status.*,+location.*,+documents.*,+account_group.*,+contacts.*',
            }) as Promise<AdminCustomerExtended>,
        queryKey: [['customer', customer.id, 'custom']],
    });

    const onClick = async (documentId: string) => {
        try {
            const { url } = await sdk.client.fetch<{ url: string }>(
                `/admin/customer/${customer.id}/documents/${documentId}`,
                {
                    method: 'GET',
                },
            );
            window.open(url, '_blank', 'noopener,noreferrer');
        } catch (err) {
            console.error('Failed to download document', err);
        }
    };

    if (isLoading) {
        return (
            <Container className="p-0">
                <div className="flex flex-col divide-y">
                    <Heading level="h2" className="px-6 py-4">
                        Documents
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
                <Heading level="h2">Documents</Heading>
            </div>
            {customerData.customer.documents.length ? (
                customerData.customer.documents.map(document => (
                    <div key={document.id} className="flex justify-between items-center py-4 px-6">
                        <Text
                            className="text-sm text-blue-500 underline cursor-pointer"
                            onClick={() => onClick(document.id)}
                        >
                            {findDocument(document.type).label}
                        </Text>
                    </div>
                ))
            ) : (
                <div className="py-4 px-6">
                    <Text>There are no documents for this customer.</Text>
                </div>
            )}
        </Container>
    );
};

export const config = defineWidgetConfig({
    zone: 'customer.details.side.after',
});

export default CustomerDocumentsWidget;
