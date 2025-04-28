import React from 'react';
import { Button, Table } from '@medusajs/ui';
import { Check, XMark } from '@medusajs/icons';
import { AdminCustomer } from '@medusajs/types';
import { formatDate } from '../../../../utils/date';

type Props = {
    customers: AdminCustomer[];
    onClickApprove: (customerId: string) => void;
};

const CompaniesTable = ({ customers, onClickApprove }: Props) => {
    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Company</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Created</Table.HeaderCell>
                        <Table.HeaderCell>Approved</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {customers.map(customer => (
                        <Table.Row key={customer.id}>
                            <Table.Cell>{customer.company_name}</Table.Cell>
                            <Table.Cell>{customer.email}</Table.Cell>
                            <Table.Cell>
                                {customer.first_name} {customer.last_name}
                            </Table.Cell>
                            <Table.Cell>{formatDate(customer.created_at)}</Table.Cell>
                            <Table.Cell>{customer.metadata.status}</Table.Cell>
                            <Table.Cell>
                                <div className="flex gap-5">
                                    <Button onClick={() => onClickApprove(customer.id)}>
                                        <Check /> Approve
                                    </Button>
                                    <Button variant={'danger'}>
                                        <XMark /> Reject
                                    </Button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            {/* TODO implement pagination */}
            <Table.Pagination
                count={1}
                pageSize={1}
                pageIndex={1}
                pageCount={1}
                canPreviousPage={false}
                canNextPage={true}
                previousPage={1}
                nextPage={1}
            />
        </>
    );
};

export default CompaniesTable;
