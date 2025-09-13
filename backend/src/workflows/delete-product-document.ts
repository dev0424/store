import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import ProductDocumentModuleService from '../modules/product-document/services/service';
import { PRODUCT_DOCUMENT_MODULE } from '../modules/product-document/index';
import { Modules } from '@medusajs/framework/utils';

export type DeleteProductDocumentStepInput = {
    documentId: string;
    productId: string;
};

export const deleteProductDocumentStep = createStep(
    'delete-product-document-step',
    async (input: DeleteProductDocumentStepInput, { container }) => {
        const link = container.resolve('link');

        const productDocumentModuleService: ProductDocumentModuleService =
            container.resolve(PRODUCT_DOCUMENT_MODULE);

        // Retrieve the product document before deleting
        const productDocument = await productDocumentModuleService.retrieveProductDocument(
            input.documentId,
        );

        // Remove link from product
        await link.dismiss({
            [Modules.PRODUCT]: { product_id: input.productId },
            [PRODUCT_DOCUMENT_MODULE]: { product_document_id: input.documentId },
        });

        // Delete the product document
        await productDocumentModuleService.deleteProductDocuments(input.documentId);

        // Pass the product document data to the compensation function
        return new StepResponse(undefined, productDocument);
    },

    // Compensation function: restore the product document if needed
    async (productDocument, { container }) => {
        if (!productDocument) {
            return;
        }

        const productDocumentModuleService: ProductDocumentModuleService =
            container.resolve(PRODUCT_DOCUMENT_MODULE);

        // Restore the product document using the stored data
        await productDocumentModuleService.createProductDocuments(productDocument);
    },
);

export const deleteProductDocumentWorkflow = createWorkflow(
    'delete-product-document',
    (input: DeleteProductDocumentStepInput) => {
        const productDocument = deleteProductDocumentStep(input);

        return new WorkflowResponse(productDocument);
    },
);
