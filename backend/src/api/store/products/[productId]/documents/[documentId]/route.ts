import type { MedusaResponse, MedusaRequest } from '@medusajs/framework';
import { Modules } from '@medusajs/utils';
import DocumentModuleService from 'modules/document/services/service';
import { DOCUMENT_MODULE } from 'modules/document';

export async function GET(request: MedusaRequest, response: MedusaResponse) {
    const fileModuleService = request.scope.resolve(Modules.FILE);
    const documentModuleService: DocumentModuleService = request.scope.resolve(DOCUMENT_MODULE);
    const { documentId } = request.params;

    const document = await documentModuleService.retrieveDocument(documentId);
    const file = await fileModuleService.retrieveFile(document.url);

    response.send({ url: file.url });
}
