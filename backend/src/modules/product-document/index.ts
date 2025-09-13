import { Module } from '@medusajs/framework/utils';
import ProductDocumentModuleService from 'modules/product-document/services/service';

export const PRODUCT_DOCUMENT_MODULE = 'product_document';

export default Module(PRODUCT_DOCUMENT_MODULE, {
    service: ProductDocumentModuleService,
});
