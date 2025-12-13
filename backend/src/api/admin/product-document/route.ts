import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { createProductDocumentWorkflow } from '../../../workflows/document/create-product-document';

type PostAdminCreateProductDocumentType = {
    url: string;
    type: string;
};

export const POST = async (
    req: MedusaRequest<PostAdminCreateProductDocumentType>,
    res: MedusaResponse,
) => {
    const { result } = await createProductDocumentWorkflow(req.scope).run({
        input: req.validatedBody,
    });

    res.json({ productDocument: result });
};
