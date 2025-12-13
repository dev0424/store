import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import DocumentModuleService from '../../modules/document/services/service';
import { DOCUMENT_MODULE } from '../../modules/document';

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
    (input: CreateProductDocumentWorkflowInput) => {
        const productDocument = createProductDocumentStep(input);

        return new WorkflowResponse(productDocument);
    },
);
