import ProductModule from '@medusajs/medusa/product';
import ProductDocumentModule from 'modules/product-document';
import { defineLink } from '@medusajs/framework/utils';

export default defineLink(
    {
        linkable: ProductModule.linkable.product,
        isList: true,
    },
    {
        linkable: ProductDocumentModule.linkable.productDocument,
        deleteCascade: true,
    },
    {
        database: {
            table: 'product_document_product',
        },
    },
);
