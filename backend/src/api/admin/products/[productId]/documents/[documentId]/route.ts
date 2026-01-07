import type { MedusaResponse, MedusaRequest } from '@medusajs/framework';
import { Modules } from '@medusajs/utils';
import DocumentModuleService from 'modules/document/services/service';
import { DOCUMENT_MODULE } from 'modules/document';
import { deleteProductDocumentWorkflow } from '../../../../../../workflows/document/delete-product-document';
import { deleteFilesWorkflow } from '@medusajs/medusa/core-flows';

export async function GET(request: MedusaRequest, response: MedusaResponse) {
    const fileModuleService = request.scope.resolve(Modules.FILE);
    const documentModuleService: DocumentModuleService = request.scope.resolve(DOCUMENT_MODULE);
    const { documentId } = request.params;

    const document = await documentModuleService.retrieveDocument(documentId);
    const file = await fileModuleService.retrieveFile(document.url);

    response.send({ url: file.url });
}

export const DELETE = async (request: MedusaRequest, response: MedusaResponse) => {
    const { result: productDocument } = await deleteProductDocumentWorkflow(request.scope).run({
        input: {
            documentId: request.params.documentId,
            productId: request.params.productId,
        },
    });

    // Cleanup storage bucket
    await deleteFilesWorkflow(request.scope).run({
        input: {
            ids: [productDocument.url],
        },
    });

    response.json({ productDocument: {} });
};
