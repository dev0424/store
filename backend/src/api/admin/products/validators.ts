import { z } from 'zod';

export const CreateProductDocumentRequest = z.object({
    filename: z.string(),
    type: z.string(),
});
