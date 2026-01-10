import React from 'react';
import { defineWidgetConfig } from '@medusajs/admin-sdk';
import { Container, Heading, Text } from '@medusajs/ui';
import { AdminProduct, DetailWidgetProps } from '@medusajs/types';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '../../lib/config';
import UploadProductDocument from './components/product/product-document/upload-product-document';
import { findDocument, toArray } from '../../lib/utils';
import DeleteProductDocument from './components/product/product-document/delete-product-document';
import { AdminProductWithDocument } from '../../lib/types';
import { Spinner } from '@medusajs/icons';

const ProductDocumentWidget = ({ data: product }: DetailWidgetProps<AdminProduct>) => {
    const {
        data: productWithDocument,
        isLoading,
        refetch: refreshDocuments,
    } = useQuery({
        queryFn: () =>
            sdk.admin.product.retrieve(product.id, {
                fields: '+documents.*',
            }) as Promise<AdminProductWithDocument>,
        queryKey: [['product', product.id, 'custom']],
    });

    const onClickDownload = async (documentId: string) => {
        try {
            const { url } = await sdk.client.fetch<{ url: string }>(
                `/admin/products/${product.id}/documents/${documentId}`,
                {
                    method: 'GET',
                },
            );
            window.open(url, '_blank', 'noopener,noreferrer');
        } catch (err) {
            console.error('Failed to download document', err);
        }
    };

    if (isLoading) {
        return (
            <Container className="p-0">
                <div className="flex flex-col divide-y">
                    <Heading level="h2" className="px-6 py-4">
                        Documents
                    </Heading>
                    <div className="w-full flex items-center justify-center p-4">
                        <Spinner className="text-ui-fg-interactive animate-spin" />
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container className="divide-y p-0">
            <div className="flex justify-between items-center px-6 py-4">
                <Heading level="h2">Documents</Heading>
                <UploadProductDocument productId={product.id} onSuccess={refreshDocuments} />
            </div>

            <div>
                {/* product document can be an object or an array */}
                {toArray(productWithDocument.product.documents)?.length ? (
                    <div className="flex flex-col divide-y">
                        {toArray(productWithDocument.product.documents).map(document => (
                            <div
                                key={document.id}
                                className="flex justify-between items-center py-4 px-6"
                            >
                                <Text
                                    className="text-sm text-blue-500 underline cursor-pointer"
                                    onClick={() => onClickDownload(document.id)}
                                >
                                    {findDocument(document.type).label}
                                </Text>
                                <DeleteProductDocument
                                    productId={product.id}
                                    documentId={document.id}
                                    onSuccess={refreshDocuments}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-4 px-6">
                        <Text>There are no documents for this product.</Text>
                    </div>
                )}
            </div>
        </Container>
    );
};

export const config = defineWidgetConfig({
    zone: 'product.details.side.after',
});

export default ProductDocumentWidget;
