import ProductModule from '@medusajs/medusa/product';
import DocumentModule from 'modules/document';
import { defineLink } from '@medusajs/framework/utils';

export default defineLink(
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
