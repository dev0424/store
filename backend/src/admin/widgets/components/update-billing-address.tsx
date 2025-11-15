import React, { useState } from 'react';
import { Button, Drawer, IconButton, toast, Toaster } from '@medusajs/ui';
import { EllipsisHorizontal } from '@medusajs/icons';
import { FormProvider, useForm } from 'react-hook-form';
import { BillingAddress } from '../../../lib/types';
import FormInput from '../../components/FormInput';
import { sdk } from '../../../lib/config';
import { BILLING_ADDRESS_RULES } from '../validation/billing_address';

type Props = {
    onSuccess: VoidFunction;
    billingAddress: BillingAddress;
};

const UpdateBillingAddress = ({ onSuccess, billingAddress }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const methods = useForm<BillingAddress>({
        defaultValues: billingAddress,
    });

    const onSubmit = async (values: BillingAddress) => {
        console.log(values);
        try {
            // Update customer billing address
            await sdk.client.fetch(`/admin/billing-address/${billingAddress.id}`, {
                method: 'PUT',
                credentials: 'include',
                body: values,
            });
            onSuccess();
            setIsOpen(false);
            toast.success('Success', {
                description: 'Billing address updated successfully',
            });
        } catch (error: any) {
            toast.error('Error', {
                description: error.message,
            });
        }
    };

    const onOpenChange = () => {
        methods.reset(billingAddress);
        setIsOpen(prevState => !prevState);
    };

    return (
        <Drawer onOpenChange={onOpenChange} open={isOpen}>
            <Toaster />
            <Drawer.Trigger>
                <IconButton variant="transparent" size="small" aria-label="Edit billing address">
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
                                Update billing address
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <div className="flex flex-col gap-4">
                                <FormInput
                                    label="Address 1"
                                    name="address_1"
                                    defaultValue={billingAddress.address_1}
                                    rules={BILLING_ADDRESS_RULES.address_1}
                                />
                                <FormInput
                                    label="Address 2"
                                    name="address_2"
                                    defaultValue={billingAddress.address_2}
                                    rules={BILLING_ADDRESS_RULES.address_2}
                                />
                                <FormInput
                                    label="Postal code"
                                    name="postal_code"
                                    defaultValue={billingAddress.postal_code}
                                    rules={BILLING_ADDRESS_RULES.postal_code}
                                />
                                <FormInput
                                    label="City"
                                    name="city"
                                    defaultValue={billingAddress.city}
                                    rules={BILLING_ADDRESS_RULES.city}
                                />
                                <FormInput
                                    label="Country code"
                                    name="country_code"
                                    defaultValue={billingAddress.country_code}
                                    rules={BILLING_ADDRESS_RULES.country_code}
                                />
                                <FormInput
                                    label="Province"
                                    name="province"
                                    defaultValue={billingAddress.province}
                                    rules={BILLING_ADDRESS_RULES.province}
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

export default UpdateBillingAddress;
