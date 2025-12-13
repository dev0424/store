import type { MedusaResponse, AuthenticatedMedusaRequest } from '@medusajs/framework';
import { uploadFilesWorkflow } from '@medusajs/medusa/core-flows';

type UploadFilesRequest = {
    files: {
        rib: File;
        kbis: File;
    };
};

export async function POST(
    request: AuthenticatedMedusaRequest<UploadFilesRequest>,
    response: MedusaResponse,
) {
    // todo store files for customerId
    const customerId = request.auth_context?.actor_id;
    const files = request.files as Express.Multer.File[];

    const { result } = await uploadFilesWorkflow(request.scope).run({
        input: {
            files: files?.map(f => ({
                filename: f.originalname,
                mimeType: f.mimetype,
                content: f.buffer.toString('binary'),
                access: 'private',
            })),
        },
    });
    response.send(result);
}
