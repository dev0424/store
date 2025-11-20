import { SystemFlag } from 'lib/types';
import React, { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Button, Checkbox, Drawer, IconButton, Label, toast, Toaster } from '@medusajs/ui';
import { EllipsisHorizontal } from '@medusajs/icons';
import { sdk } from '../../../../../lib/config';

type Props = {
    systemFlag: SystemFlag;
    onSuccess: VoidFunction;
};

const UpdateSystemFlag = ({ systemFlag, onSuccess }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const methods = useForm<SystemFlag>({
        defaultValues: systemFlag,
    });

    const onSubmit = async (data: SystemFlag) => {
        try {
            await sdk.client.fetch(`/admin/system-flag/${data.id}`, {
                method: 'PUT',
                credentials: 'include',
                body: data,
            });
            toast.success('Success', {
                description: 'System flag updated successfully',
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
        methods.reset(systemFlag);
        setIsOpen(prevState => !prevState);
    };

    return (
        <Drawer onOpenChange={onOpenChange} open={isOpen}>
            <Toaster />
            <Drawer.Trigger>
                <IconButton variant="transparent" size="small" aria-label="Update system flags">
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
                                Update system flag
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-2">
                                    <Controller
                                        render={({ field }) => (
                                            <Checkbox
                                                checked={field.value === 'true'}
                                                onCheckedChange={checked => {
                                                    field.onChange(checked ? 'true' : 'false');
                                                }}
                                                id={field.key}
                                            />
                                        )}
                                        control={methods.control}
                                        name="value"
                                    />
                                    <Label htmlFor={systemFlag.key}>{systemFlag.name}</Label>
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

export default UpdateSystemFlag;
