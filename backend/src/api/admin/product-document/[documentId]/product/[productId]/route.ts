import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { deleteProductDocumentWorkflow } from 'workflows/delete-product-document';

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
    const { result } = await deleteProductDocumentWorkflow(req.scope).run({
        input: {
            documentId: req.params.documentId,
            productId: req.params.productId,
        },
    });

    res.json({ productDocument: result });
};
