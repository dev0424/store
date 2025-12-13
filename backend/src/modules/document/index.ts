import { Module } from '@medusajs/framework/utils';
import DocumentModuleService from 'modules/document/services/service';

export const DOCUMENT_MODULE = 'document';

export default Module(DOCUMENT_MODULE, {
    service: DocumentModuleService,
});
