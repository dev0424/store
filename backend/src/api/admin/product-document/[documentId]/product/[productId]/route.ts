import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { deleteProductDocumentWorkflow } from '../../../../../../workflows/document/delete-product-document';
import { deleteFilesWorkflow } from '@medusajs/medusa/core-flows';
import { getFileNameFromUrl } from '../../../../product-document/utils';

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
    const { result: productDocument } = await deleteProductDocumentWorkflow(req.scope).run({
        input: {
            documentId: req.params.documentId,
            productId: req.params.productId,
        },
    });

    const fileName = getFileNameFromUrl(productDocument.url);

    // Cleanup storage bucket
    if (fileName) {
        await deleteFilesWorkflow(req.scope).run({
            input: {
                ids: [fileName],
            },
        });
    }

    res.json({ productDocument: productDocument });
};
