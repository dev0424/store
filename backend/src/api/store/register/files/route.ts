import type {
    MedusaResponse,
    AuthenticatedMedusaRequest,
    MedusaRequest,
} from '@medusajs/framework';
import { uploadFilesWorkflow } from '@medusajs/medusa/core-flows';
import { BankAccount, CustomerProfile } from '../../../lib/types';
import { CreateCustomerDTO } from '@medusajs/types';

type CreateCustomerRequest = CreateCustomerDTO & {
    bank_account: BankAccount;
    customer_profile: CustomerProfile;
    files: {
        rib: File;
        kbis: File;
    };
};

export async function POST(
    request: MedusaRequest<CreateCustomerRequest>,
    response: MedusaResponse,
) {
    // TODO validate request body
    const customerData = request.body;
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
    console.log(result);
    response.send(result);
}
