import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import DocumentModuleService from '../../modules/document/services/service';
import { DOCUMENT_MODULE } from '../../modules/document/index';
import { Modules } from '@medusajs/framework/utils';

export type DeleteProductDocumentStepInput = {
    documentId: string;
    productId: string;
};

export const deleteProductDocumentStep = createStep(
    'delete-product-document-step',
    async (input: DeleteProductDocumentStepInput, { container }) => {
        const link = container.resolve('link');

        const documentModuleService: DocumentModuleService = container.resolve(DOCUMENT_MODULE);

        // Retrieve the product document before deleting
        const productDocument = await documentModuleService.retrieveDocument(input.documentId);

        // Remove link from product
        await link.dismiss({
            [Modules.PRODUCT]: { product_id: input.productId },
            [DOCUMENT_MODULE]: { document_id: input.documentId },
        });

        // Delete the product document
        await documentModuleService.deleteDocuments(input.documentId);

        // Pass the product document data to the compensation function
        return new StepResponse(productDocument, productDocument);
    },

    // Compensation function: restore the product document if needed
    async (productDocument, { container }) => {
        if (!productDocument) {
            return;
        }

        const documentModuleService: DocumentModuleService = container.resolve(DOCUMENT_MODULE);

        // Restore the product document using the stored data
        await documentModuleService.createDocuments(productDocument);
    },
);

export const deleteProductDocumentWorkflow = createWorkflow(
    'delete-product-document',
    (input: DeleteProductDocumentStepInput) => {
        const productDocument = deleteProductDocumentStep(input);

        return new WorkflowResponse(productDocument);
    },
);
