import React from 'react';
import { defineRouteConfig } from '@medusajs/admin-sdk';
import { Container, Heading } from '@medusajs/ui';
import { AdminCustomer, AdminCustomerListResponse } from '@medusajs/types';
import { Users } from '@medusajs/icons';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../../lib/config';
import CompaniesTable from './components/companies-table';

const CompaniesPage = () => {
    const {
        data,
        isLoading,
        error,
        refetch: refetchCustomers,
    } = useQuery<AdminCustomerListResponse>({
        queryFn: () => sdk.admin.customer.list(),
        queryKey: ['customers'],
    });

    const filteredCustomers: AdminCustomer[] = data?.customers?.filter(
        (customer: AdminCustomer) => !!customer.metadata?.status,
    );

    if (isLoading) {
        return (
            <Container className="p-0">
                <div className="px-6 py-4">
                    <Heading level="h1">Companies</Heading>
                    <p>Loading...</p>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Heading level="h1">Companies</Heading>
                <p>Failed to load customers</p>
            </Container>
        );
    }

    const onClickApprove = async (customerId: string) => {
        try {
            await sdk.client.fetch(`/admin/company/${customerId}/approve`, {
                method: 'POST',
                credentials: 'include',
            });

            await refetchCustomers();
        } catch (error) {
            // TODO handle error
            console.error(error);
        }
    };

    return (
        <Container className="p-0">
            <div className="px-6 py-4">
                <Heading level="h1">Companies</Heading>
            </div>
            <CompaniesTable customers={filteredCustomers} onClickApprove={onClickApprove} />
        </Container>
    );
};

export const config = defineRouteConfig({
    label: 'Companies',
    icon: Users,
});

export default CompaniesPage;
