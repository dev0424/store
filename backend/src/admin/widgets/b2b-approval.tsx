import React from 'react';
import { Container, Heading } from '@medusajs/ui';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { Table } from '@medusajs/ui';
import { Button } from '@medusajs/ui';
import { Check, XMark } from '@medusajs/icons';

const B2BApprovalWidget = () => {
    return (
        <Container className="p-0">
            <div className="px-6 py-4">
                <Heading level="h1">Approve B2B customers</Heading>
            </div>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Created</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Test</Table.Cell>
                        <Table.Cell>Test</Table.Cell>
                        <Table.Cell>Test</Table.Cell>
                        <Table.Cell>Test</Table.Cell>
                        <Table.Cell>
                            <div className="flex gap-5">
                                <Button>
                                    <Check /> Approve
                                </Button>
                                <Button variant={'danger'}>
                                    <XMark /> Reject
                                </Button>
                            </div>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Container>
    );
};

export const config = defineWidgetConfig({
    zone: 'customer.list.before',
});

export default B2BApprovalWidget;
