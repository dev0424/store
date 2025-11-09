import React from 'react';
import { IconButton, Prompt, toast, Toaster } from '@medusajs/ui';
import { Trash } from '@medusajs/icons';
import { useMutation } from '@tanstack/react-query';
import { sdk } from '../../../lib/config';

type Props = {
    documentId: string;
    productId: string;
    onSuccess: VoidFunction;
};

const DeleteProductDocument = ({ documentId, productId, onSuccess }: Props) => {
    const { mutateAsync } = useMutation({
        mutationFn: () =>
            sdk.client.fetch(`/admin/product-document/${documentId}/product/${productId}`, {
                method: 'DELETE',
                credentials: 'include',
            }),
    });

    const onClickDelete = async () => {
        try {
            await mutateAsync();
            onSuccess();
            toast.success('Success', {
                description: 'Document deleted successfully',
            });
        } catch (error: any) {
            toast.error('Error', {
                description: error.message,
            });
        }
    };

    return (
        <Prompt>
            <Toaster />
            <Prompt.Trigger>
                <IconButton>
                    <Trash />
                </IconButton>
            </Prompt.Trigger>
            <Prompt.Content>
                <Prompt.Header>
                    <Prompt.Title>Delete confirmation</Prompt.Title>
                    <Prompt.Description>
                        Are you sure you want to delete this item? This action cannot be undone.
                    </Prompt.Description>
                </Prompt.Header>
                <Prompt.Footer>
                    <Prompt.Cancel>Cancel</Prompt.Cancel>
                    <Prompt.Action onClick={onClickDelete}>Delete</Prompt.Action>
                </Prompt.Footer>
            </Prompt.Content>
        </Prompt>
    );
};

export default DeleteProductDocument;
