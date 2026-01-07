import type { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { createProductDocumentWorkflow } from '../../../../../../workflows/document/create-product-document';
import { Modules } from '@medusajs/framework/utils';
import { randomUUID } from 'crypto';

type RequestBody = {
    type: string;
    filename: string;
};

export const POST = async (
    request: AuthenticatedMedusaRequest<RequestBody>,
    response: MedusaResponse,
) => {
    const { type, filename } = request.validatedBody;
    const { productId } = request.params;
    const shortId = randomUUID().replace(/-/g, '').slice(0, 8);
    const url = `products/${productId}/documents/${type}-${shortId}-${filename}`;

    const fileModuleService = request.scope.resolve(Modules.FILE);

    const { result } = await createProductDocumentWorkflow(request.scope).run({
        input: {
            type,
            url,
            productId,
        },
    });

    const presignedUrl = await fileModuleService.getUploadFileUrls({
        filename: url,
    });

    response.status(200).json({ file: result, presignedUrl });
};
