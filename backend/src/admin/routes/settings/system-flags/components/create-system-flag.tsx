import { SystemFlag } from 'lib/types';
import React, { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Button, Drawer, IconButton, toast, Toaster } from '@medusajs/ui';
import { Plus } from '@medusajs/icons';
import { SYSTEM_FLAG_RULES } from './validation/system-flag';
import FormInput from '../../../../components/FormInput';
import { sdk } from '../../../../../lib/config';

type Props = {
    onSuccess: VoidFunction;
};

const CreateSystemFlag = ({ onSuccess }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const methods = useForm<SystemFlag>();

    const onSubmit = async (data: SystemFlag) => {
        try {
            await sdk.client.fetch('/admin/system-flag', {
                method: 'POST',
                credentials: 'include',
                body: data,
            });
            toast.success('Success', {
                description: 'System flag created successfully',
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
        methods.reset();
        setIsOpen(prevState => !prevState);
    };

    return (
        <Drawer onOpenChange={onOpenChange} open={isOpen}>
            <Toaster />
            <Drawer.Trigger>
                <IconButton variant="transparent" size="small" aria-label="Create system flags">
                    <Plus />
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
                                Create system flag
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <div className="flex flex-col gap-4">
                                <FormInput
                                    label="Name"
                                    name="name"
                                    rules={SYSTEM_FLAG_RULES.name}
                                />
                                <FormInput label="Key" name="key" rules={SYSTEM_FLAG_RULES.key} />
                                <FormInput
                                    label="Value"
                                    name="value"
                                    rules={SYSTEM_FLAG_RULES.value}
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

export default CreateSystemFlag;
