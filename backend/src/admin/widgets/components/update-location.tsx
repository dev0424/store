import React, { useState } from 'react';
import { Button, Drawer, IconButton, toast, Toaster } from '@medusajs/ui';
import { EllipsisHorizontal } from '@medusajs/icons';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '../../components/FormInput';
import { Location } from '../../../lib/types';
import { sdk } from '../../../lib/config';

type Props = {
    location: Location;
    onSuccess: VoidFunction;
};

const UpdateLocation = ({ location, onSuccess }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const methods = useForm<Location>({
        defaultValues: location,
    });

    const onSubmit = async (values: Location) => {
        try {
            // Update customer location
            await sdk.client.fetch(`/admin/location/${location.id}`, {
                method: 'PUT',
                credentials: 'include',
                body: {
                    ...values,
                    latitude: Number(values.latitude),
                    longitude: Number(values.longitude),
                },
            });
            onSuccess();
            setIsOpen(false);
            toast.success('Success', {
                description: 'Customer location updated successfully',
            });
        } catch (error: any) {
            toast.error('Error', {
                description: error.message,
            });
        }
    };

    const onOpenChange = () => {
        methods.reset(location);
        setIsOpen(prevState => !prevState);
    };

    return (
        <Drawer onOpenChange={onOpenChange} open={isOpen}>
            <Toaster />
            <Drawer.Trigger>
                <IconButton variant="transparent" size="small" aria-label="Edit customer location">
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
                                Update customer location
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <div className="flex flex-col gap-4">
                                <FormInput
                                    label="Latitude"
                                    name="latitude"
                                    type="number"
                                    defaultValue={location?.latitude}
                                />
                                <FormInput
                                    label="Longitude"
                                    name="longitude"
                                    type="number"
                                    defaultValue={location?.longitude}
                                />
                                <FormInput
                                    label="Address 1"
                                    name="address_1"
                                    type="text"
                                    defaultValue={location?.address_1}
                                />
                                <FormInput
                                    label="Address 2"
                                    name="address_2"
                                    type="text"
                                    defaultValue={location?.address_2}
                                />
                                <FormInput
                                    label="City"
                                    name="city"
                                    type="text"
                                    defaultValue={location?.city}
                                />
                                <FormInput
                                    label="Country code"
                                    name="country_code"
                                    type="text"
                                    defaultValue={location?.country_code}
                                />
                                <FormInput
                                    label="Province"
                                    name="province"
                                    type="text"
                                    defaultValue={location?.province}
                                />
                                <FormInput
                                    label="Postal code"
                                    name="postal_code"
                                    type="text"
                                    defaultValue={location?.postal_code}
                                />
                                <FormInput
                                    label="Phone"
                                    name="phone"
                                    type="text"
                                    defaultValue={location?.phone}
                                />
                                <FormInput
                                    label="Email"
                                    name="email"
                                    type="text"
                                    defaultValue={location?.email}
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

export default UpdateLocation;
