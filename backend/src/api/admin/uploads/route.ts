import type { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { MedusaError } from '@medusajs/framework/utils';
import { uploadFilesWorkflow } from '@medusajs/medusa/core-flows';

export const POST = async (request: AuthenticatedMedusaRequest, response: MedusaResponse) => {
    const files = request.files as Express.Multer.File[];

    if (!files?.length) {
        throw new MedusaError(MedusaError.Types.INVALID_DATA, 'No files were uploaded');
    }

    const { result } = await uploadFilesWorkflow(request.scope).run({
        input: {
            files: files.map(f => ({
                filename: f.originalname,
                mimeType: f.mimetype,
                content: f.buffer.toString('binary'),
                access: 'public',
            })),
        },
    });

    response.status(200).json({ files: result });
};
