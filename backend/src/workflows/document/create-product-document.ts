import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import DocumentModuleService from '../../modules/document/services/service';
import { DOCUMENT_MODULE } from '../../modules/document';
import { createRemoteLinkStep } from '@medusajs/core-flows';
import { Modules } from '@medusajs/utils';

export type WorkflowInput = {
    url: string;
    type: string;
    productId: string;
};

export const createProductDocumentStep = createStep(
    'create-product-document-step',
    async (input: WorkflowInput, { container }) => {
        const documentModuleService: DocumentModuleService = container.resolve(DOCUMENT_MODULE);

        const productDocument = await documentModuleService.createDocuments(input);

        return new StepResponse(productDocument, productDocument.id);
    },

    // Compensation function
    async (id: string, { container }) => {
        const documentModuleService: DocumentModuleService = container.resolve(DOCUMENT_MODULE);

        await documentModuleService.deleteDocuments(id);
    },
);

export const createProductDocumentWorkflow = createWorkflow(
    'create-product-document',
    (input: WorkflowInput) => {
        // Create the document
        const productDocument = createProductDocumentStep(input);

        // Link the document to the product
        createRemoteLinkStep([
            {
                [Modules.PRODUCT]: {
                    product_id: input.productId,
                },
                [DOCUMENT_MODULE]: {
                    document_id: productDocument.id,
                },
            },
        ]);

        return new WorkflowResponse(productDocument);
    },
);
