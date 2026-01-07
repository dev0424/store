import React, { useState } from 'react';
import { Button, Drawer, IconButton, Select, Text, toast, Toaster } from '@medusajs/ui';
import { Plus } from '@medusajs/icons';
import { Controller, useForm } from 'react-hook-form';
import { PRODUCT_DOCUMENT_RULES } from '../validation/product-document';
import { useDropzone } from 'react-dropzone';
import { sdk } from '../../../lib/config';
import { DOCUMENT_TYPE_METADATA } from '../constants';

type ProductDocumentForm = {
    type: string;
    file: File | null;
};

type UploadDocumentResponse = {
    file: {
        id: string;
        url: string;
        type: string;
        mime_type: string;
        name: string;
        size: number;
        created_at: string;
        updated_at: string;
        deleted_at: string;
    };
    presignedUrl: {
        key: string;
        url: string;
    };
};

type Props = {
    productId: string;
    onSuccess: VoidFunction;
};

const UploadProductDocument = ({ productId, onSuccess }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProductDocumentForm>({
        defaultValues: {
            type: '',
            file: null,
        },
    });

    const onSubmit = async (values: ProductDocumentForm) => {
        try {
            const response: UploadDocumentResponse = await sdk.client.fetch(
                `/admin/products/${productId}/documents/upload`,
                {
                    method: 'POST',
                    credentials: 'include',
                    body: {
                        type: values.type,
                        filename: values.file.name,
                    },
                },
            );

            // Upload files to bucket with presigned url
            await fetch(response.presignedUrl.url, {
                method: 'PUT',
                body: values.file,
                headers: {
                    'Content-Type': values.file.type,
                },
            });

            onSuccess();
            setIsOpen(false);
            toast.success('Success', {
                description: 'Document uploaded successfully',
            });
        } catch (error) {
            console.error(`Error uploading ${values.file.name}:`, error);
            toast.error('Error', {
                description: error.message,
            });
        }
    };

    const onOpenChange = () => {
        reset({
            type: '',
            file: null,
        });
        setIsOpen(prevState => !prevState);
    };

    return (
        <Drawer onOpenChange={onOpenChange} open={isOpen}>
            <Toaster />
            <Drawer.Trigger>
                <IconButton variant="transparent" size="small" aria-label="Add document">
                    <Plus />
                </IconButton>
            </Drawer.Trigger>
            <Drawer.Content>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-4">
                    <Drawer.Header>
                        <Drawer.Title className="font-sans font-medium h1-core">
                            Upload document
                        </Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Controller
                                    rules={PRODUCT_DOCUMENT_RULES.type}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <Select.Trigger>
                                                <Select.Value placeholder="Select type" />
                                            </Select.Trigger>
                                            <Select.Content>
                                                {DOCUMENT_TYPE_METADATA.map(document => (
                                                    <Select.Item
                                                        key={document.type}
                                                        value={document.type}
                                                    >
                                                        {document.label}
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select>
                                    )}
                                    control={control}
                                    name="type"
                                />
                                {errors.type && (
                                    <Text className="text-red-500 text-xs">
                                        {errors.type?.message}
                                    </Text>
                                )}
                            </div>

                            <Controller
                                control={control}
                                name="file"
                                rules={PRODUCT_DOCUMENT_RULES.file}
                                render={({ field }) => {
                                    const { getRootProps, getInputProps } = useDropzone({
                                        multiple: false,
                                        accept: {
                                            'application/pdf': [],
                                        },
                                        onDrop: acceptedFiles => {
                                            field.onChange(acceptedFiles[0] ?? null);
                                        },
                                    });

                                    return (
                                        <section className="flex flex-col gap-2">
                                            <div
                                                {...getRootProps()}
                                                className="border border-dashed rounded-md cursor-pointer p-8 flex flex-col items-center justify-center bg-gray-50 border-gray-300 hover:border-blue-400 text-gray-600"
                                            >
                                                <input {...getInputProps()} multiple={false} />
                                                <p>Upload file</p>
                                                <p className="text-xs mt-2">
                                                    Drag and drop a file here, or click to select a
                                                    file
                                                </p>
                                            </div>

                                            {field.value && (
                                                <aside>
                                                    <h4>File</h4>
                                                    <ul>
                                                        <li>
                                                            {field.value.name} - {field.value.size}{' '}
                                                            bytes
                                                        </li>
                                                    </ul>
                                                </aside>
                                            )}
                                            {errors.file && (
                                                <Text className="text-red-500 text-xs">
                                                    {errors.file?.message}
                                                </Text>
                                            )}
                                        </section>
                                    );
                                }}
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
            </Drawer.Content>
        </Drawer>
    );
};

export default UploadProductDocument;
