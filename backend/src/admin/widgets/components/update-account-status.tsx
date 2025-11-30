import React, { useState } from 'react';
import { Button, Drawer, IconButton, Select, toast, Toaster, Label, Checkbox } from '@medusajs/ui';
import { EllipsisHorizontal } from '@medusajs/icons';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { AccountStatus } from '../../../lib/types';
import { sdk } from '../../../lib/config';
import { APPLICATION_STATUS_METADATA } from '../../widgets/constants';

type Props = {
    onSuccess: VoidFunction;
    accountStatus: AccountStatus;
    customerId: string;
};

const UpdateAccountStatus = ({ onSuccess, accountStatus, customerId }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const methods = useForm<AccountStatus>({
        defaultValues: accountStatus,
    });

    const onSubmit = async (data: AccountStatus) => {
        try {
            await sdk.client.fetch(`/admin/customer/${customerId}/account-status`, {
                method: 'PUT',
                credentials: 'include',
                body: data,
            });
            toast.success('Success', {
                description: 'Account status updated successfully',
            });
            setIsOpen(false);
            onSuccess();
        } catch (error) {
            toast.error('Error', {
                description: error.message,
            });
        }
    };

    const onOpenChange = () => {
        methods.reset(accountStatus);
        setIsOpen(prevState => !prevState);
    };

    return (
        <Drawer onOpenChange={onOpenChange} open={isOpen}>
            <Toaster />
            <Drawer.Trigger>
                <IconButton variant="transparent" size="small" aria-label="Update account status">
                    <EllipsisHorizontal />
                </IconButton>
            </Drawer.Trigger>
            <Drawer.Content>
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="flex flex-1 flex-col"
                    >
                        <Drawer.Header>
                            <Drawer.Title className="font-sans font-medium h1-core">
                                Update account status
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label className="font-sans txt-compact-small font-medium">
                                        Application status
                                    </Label>
                                    <Controller
                                        render={({ field }) => (
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <Select.Trigger>
                                                    <Select.Value placeholder="Select status" />
                                                </Select.Trigger>
                                                <Select.Content>
                                                    {Object.entries(
                                                        APPLICATION_STATUS_METADATA,
                                                    ).map(([key, metadata]) => (
                                                        <Select.Item key={key} value={key}>
                                                            {metadata.label}
                                                        </Select.Item>
                                                    ))}
                                                </Select.Content>
                                            </Select>
                                        )}
                                        control={methods.control}
                                        name="application_status"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Controller
                                        render={({ field }) => (
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                id="is_searchable"
                                            />
                                        )}
                                        control={methods.control}
                                        name="is_searchable"
                                    />
                                    <Label htmlFor="is_searchable">Show in distributor list</Label>
                                </div>
                            </div>
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Drawer.Close asChild>
                                <Button variant="secondary" type="button">
                                    Cancel
                                </Button>
                            </Drawer.Close>
                            <Button type="submit">Save</Button>
                        </Drawer.Footer>
                    </form>
                </FormProvider>
            </Drawer.Content>
        </Drawer>
    );
};

export default UpdateAccountStatus;
