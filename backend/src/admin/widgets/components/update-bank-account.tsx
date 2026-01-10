import React, { useState } from 'react';
import { Button, Drawer, IconButton, toast, Toaster } from '@medusajs/ui';
import { EllipsisHorizontal } from '@medusajs/icons';
import { FormProvider, useForm } from 'react-hook-form';
import { BankAccount } from '../../../lib/types';
import { BANK_ACCOUNT_RULES } from '../validation/bank-account';
import FormInput from '../../components/FormInput';
import { sdk } from '../../../lib/config';

type Props = {
    onSuccess: VoidFunction;
    bankAccount: BankAccount;
    customerId: string;
};

const UpdateBankAccount = ({ onSuccess, bankAccount, customerId }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const methods = useForm<BankAccount>({
        defaultValues: bankAccount,
    });

    const onSubmit = async (values: BankAccount) => {
        try {
            // Update customer bank account
            await sdk.client.fetch(`/admin/customer/${customerId}/bank-account`, {
                method: 'PUT',
                credentials: 'include',
                body: values,
            });
            onSuccess();
            setIsOpen(false);
            toast.success('Success', {
                description: 'Bank account updated successfully',
            });
        } catch (error: any) {
            toast.error('Error', {
                description: error.message,
            });
        }
    };

    const onOpenChange = () => {
        methods.reset(bankAccount);
        setIsOpen(prevState => !prevState);
    };

    return (
        <Drawer onOpenChange={onOpenChange} open={isOpen}>
            <Toaster />
            <Drawer.Trigger>
                <IconButton variant="transparent" size="small" aria-label="Edit bank account">
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
                                Update bank account
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <div className="flex flex-col gap-4">
                                <FormInput
                                    label="Bank name"
                                    name="bank_name"
                                    defaultValue={bankAccount.bank_name}
                                    rules={BANK_ACCOUNT_RULES.bank_name}
                                />
                                <FormInput
                                    label="Bank code"
                                    name="bank_code"
                                    defaultValue={bankAccount.bank_code}
                                    rules={BANK_ACCOUNT_RULES.bank_code}
                                />
                                <FormInput
                                    label="Branch code"
                                    name="branch_code"
                                    defaultValue={bankAccount.branch_code}
                                    rules={BANK_ACCOUNT_RULES.branch_code}
                                />
                                <FormInput
                                    label="City"
                                    name="city"
                                    defaultValue={bankAccount.city}
                                    rules={BANK_ACCOUNT_RULES.city}
                                />
                                <FormInput
                                    label="Address"
                                    name="address"
                                    defaultValue={bankAccount.address}
                                    rules={BANK_ACCOUNT_RULES.address}
                                />
                                <FormInput
                                    label="Account number"
                                    name="account_number"
                                    defaultValue={bankAccount.account_number}
                                    rules={BANK_ACCOUNT_RULES.account_number}
                                />
                                <FormInput
                                    label="Account holder"
                                    name="account_holder"
                                    defaultValue={bankAccount.account_holder}
                                    rules={BANK_ACCOUNT_RULES.account_holder}
                                />
                                <FormInput
                                    label="IBAN"
                                    name="iban"
                                    defaultValue={bankAccount.iban}
                                    rules={BANK_ACCOUNT_RULES.iban}
                                />
                                <FormInput
                                    label="BIC"
                                    name="bic"
                                    defaultValue={bankAccount.bic}
                                    rules={BANK_ACCOUNT_RULES.bic}
                                />
                                <FormInput
                                    label="RIB key"
                                    name="rib_key"
                                    defaultValue={bankAccount.rib_key}
                                    rules={BANK_ACCOUNT_RULES.rib_key}
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

export default UpdateBankAccount;
