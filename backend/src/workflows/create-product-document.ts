import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import ProductDocumentModuleService from 'modules/product-document/services/service';
import { PRODUCT_DOCUMENT_MODULE } from 'modules/product-document';

export type CreateProductDocumentStepInput = {
    url: string;
    type: string;
};

type CreateProductDocumentWorkflowInput = {
    url: string;
    type: string;
};

export const createProductDocumentStep = createStep(
    'create-product-document-step',
    async (input: CreateProductDocumentStepInput, { container }) => {
        const productDocumentModuleService: ProductDocumentModuleService =
            container.resolve(PRODUCT_DOCUMENT_MODULE);

        const productDocument = await productDocumentModuleService.createProductDocuments(input);

        return new StepResponse(productDocument, productDocument.id);
    },

    // Compensation function
    async (id: string, { container }) => {
        const productDocumentModuleService: ProductDocumentModuleService =
            container.resolve(PRODUCT_DOCUMENT_MODULE);

        await productDocumentModuleService.deleteProductDocuments(id);
    },
);

export const createProductDocumentWorkflow = createWorkflow(
    'create-product-document',
    (input: CreateProductDocumentWorkflowInput) => {
        const productDocument = createProductDocumentStep(input);

        return new WorkflowResponse(productDocument);
    },
);
