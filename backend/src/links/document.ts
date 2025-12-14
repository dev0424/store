import ProductModule from '@medusajs/medusa/product';
import DocumentModule from 'modules/document';
import { defineLink } from '@medusajs/framework/utils';
import CustomerModule from '@medusajs/medusa/customer';

export const productDocumentLink = defineLink(
    {
        linkable: ProductModule.linkable.product,
        isList: true,
    },
    {
        linkable: DocumentModule.linkable.document,
        deleteCascade: true,
        isList: true,
    },
    {
        database: {
            table: 'document_product',
        },
    },
);

export const customerDocumentLink = defineLink(
    {
        linkable: CustomerModule.linkable.customer,
        isList: true,
    },
    {
        linkable: DocumentModule.linkable.document,
        deleteCascade: true,
        isList: true,
    },
    {
        database: {
            table: 'document_customer',
        },
    },
);
