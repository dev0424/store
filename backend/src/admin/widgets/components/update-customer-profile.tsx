import React, { useState } from 'react';
import { Button, Drawer, IconButton, toast, Toaster } from '@medusajs/ui';
import { EllipsisHorizontal } from '@medusajs/icons';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomerProfile } from '../../../lib/types';
import FormInput from '../../components/FormInput';
import { CUSTOMER_PROFILE_RULES } from '../../widgets/validation/customer-profile';
import FormSelect from '../../components/FormSelect';
import { sdk } from '../../../lib/config';

type Props = {
    onSuccess: VoidFunction;
    customerProfile: CustomerProfile;
};

const UpdateCustomerProfile = ({ onSuccess, customerProfile }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const methods = useForm<CustomerProfile>({
        defaultValues: customerProfile,
    });

    const onSubmit = async (values: CustomerProfile) => {
        try {
            // Update customer profile
            await sdk.client.fetch(`/admin/customer-profile/${customerProfile.id}`, {
                method: 'PUT',
                credentials: 'include',
                body: values,
            });
            onSuccess();
            setIsOpen(false);
            toast.success('Success', {
                description: 'Customer profile updated successfully',
            });
        } catch (error: any) {
            toast.error('Error', {
                description: error.message,
            });
        }
    };

    const onOpenChange = () => {
        methods.reset(customerProfile);
        setIsOpen(prevState => !prevState);
    };

    return (
        <Drawer onOpenChange={onOpenChange} open={isOpen}>
            <Toaster />
            <Drawer.Trigger>
                <IconButton variant="transparent" size="small" aria-label="Edit customer profile">
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
                                Update customer profile
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <div className="flex flex-col gap-4">
                                <FormInput
                                    label="VAT number"
                                    name="vat_number"
                                    defaultValue={customerProfile.vat_number}
                                    rules={CUSTOMER_PROFILE_RULES.vat_number}
                                />
                                <FormInput
                                    label="Siret number"
                                    name="siret_number"
                                    defaultValue={customerProfile.siret_number}
                                    rules={CUSTOMER_PROFILE_RULES.siret_number}
                                />
                                <FormInput
                                    label="APE code"
                                    name="ape_code"
                                    defaultValue={customerProfile.ape_code}
                                    rules={CUSTOMER_PROFILE_RULES.ape_code}
                                />
                                <FormSelect
                                    name="activity"
                                    defaultValue={customerProfile.activity}
                                    label="Activity"
                                    rules={CUSTOMER_PROFILE_RULES.activity}
                                    items={[
                                        { key: 'activity-1', label: 'Activity 1' },
                                        { key: 'activity-2', label: 'Activity 2' },
                                    ]}
                                />
                                <FormSelect
                                    name="billing_cycle"
                                    defaultValue={customerProfile.billing_cycle}
                                    label="Billing cycle"
                                    rules={CUSTOMER_PROFILE_RULES.billing_cycle}
                                    items={[
                                        { key: 'billing-cycle-1', label: 'Billing cycle 1' },
                                        { key: 'billing-cycle-2', label: 'Billing cycle 2' },
                                    ]}
                                />
                                <FormSelect
                                    name="payment_method"
                                    defaultValue={customerProfile.payment_method}
                                    label="Payment method"
                                    rules={CUSTOMER_PROFILE_RULES.payment_method}
                                    items={[
                                        { key: 'payment-method-1', label: 'Payment method 1' },
                                        { key: 'payment-method-2', label: 'Payment method 2' },
                                    ]}
                                />
                                <FormInput
                                    label="Invoice email"
                                    name="invoice_email"
                                    defaultValue={customerProfile.invoice_email}
                                    rules={CUSTOMER_PROFILE_RULES.invoice_email}
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

export default UpdateCustomerProfile;
