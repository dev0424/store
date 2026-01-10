import React, { useState } from 'react';
import { Button, Checkbox, Drawer, IconButton, Label, Select, toast, Toaster } from '@medusajs/ui';
import { EllipsisHorizontal } from '@medusajs/icons';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { AccountGroup } from '../../../../../lib/types';
import FormInput from '../../../../components/FormInput';
import { sdk } from '../../../../../lib/config';

type Props = {
    onSuccess: VoidFunction;
    accountGroup: AccountGroup;
    customerId: string;
};

const UpdateAccountGroup = ({ onSuccess, accountGroup, customerId }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const methods = useForm<AccountGroup>({
        defaultValues: accountGroup,
    });

    const onSubmit = async (values: AccountGroup) => {
        try {
            // Update customer account group
            await sdk.client.fetch(`/admin/customer/${customerId}/account-group`, {
                method: 'PUT',
                credentials: 'include',
                body: values,
            });
            onSuccess();
            setIsOpen(false);
            toast.success('Success', {
                description: 'Account group updated successfully',
            });
        } catch (error: any) {
            toast.error('Error', {
                description: error.message,
            });
        }
    };

    const onOpenChange = () => {
        methods.reset(accountGroup);
        setIsOpen(prevState => !prevState);
    };

    return (
        <Drawer onOpenChange={onOpenChange} open={isOpen}>
            <Toaster />
            <Drawer.Trigger>
                <IconButton variant="transparent" size="small" aria-label="Update account group">
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
                                Update account group
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-2">
                                    <Controller
                                        render={({ field }) => (
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                id="is_centralized_billing"
                                            />
                                        )}
                                        control={methods.control}
                                        name="is_centralized_billing"
                                    />
                                    <Label htmlFor="is_centralized_billing">
                                        Centralized billing
                                    </Label>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="font-sans txt-compact-small font-medium">
                                        Corporate status
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
                                                    <Select.Item
                                                        key="subsidiary"
                                                        value="subsidiary"
                                                    >
                                                        subsidiary
                                                    </Select.Item>
                                                    <Select.Item
                                                        key="independent"
                                                        value="independent"
                                                    >
                                                        independent
                                                    </Select.Item>
                                                </Select.Content>
                                            </Select>
                                        )}
                                        control={methods.control}
                                        name="corporate_status"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Controller
                                        render={({ field }) => (
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                id="is_purchasing_group_member"
                                            />
                                        )}
                                        control={methods.control}
                                        name="is_purchasing_group_member"
                                    />
                                    <Label htmlFor="is_purchasing_group_member">
                                        Purchasing group name
                                    </Label>
                                </div>
                                <FormInput
                                    label="Purchasing group name"
                                    name="purchasing_group_name"
                                    defaultValue={accountGroup.purchasing_group_name}
                                />
                                <FormInput
                                    label="Membership number"
                                    name="membership_number"
                                    defaultValue={accountGroup.membership_number}
                                />
                                <div className="flex gap-2">
                                    <Controller
                                        render={({ field }) => (
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                id="is_agency_or_branch"
                                            />
                                        )}
                                        control={methods.control}
                                        name="is_agency_or_branch"
                                    />
                                    <Label htmlFor="is_agency_or_branch">Agency or branch</Label>
                                </div>
                                <FormInput
                                    label="Parent group name"
                                    name="parent_group_name"
                                    defaultValue={accountGroup.parent_group_name}
                                />
                                <div className="flex gap-2">
                                    <Controller
                                        render={({ field }) => (
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                id="is_platform_client"
                                            />
                                        )}
                                        control={methods.control}
                                        name="is_platform_client"
                                    />
                                    <Label htmlFor="is_platform_client">Platform client</Label>
                                </div>
                                <FormInput
                                    label="Platform name"
                                    name="platform_name"
                                    defaultValue={accountGroup.platform_name}
                                />
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

export default UpdateAccountGroup;
