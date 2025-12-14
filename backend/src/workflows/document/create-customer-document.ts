import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse,
    when,
    transform,
} from '@medusajs/framework/workflows-sdk';
import { createRemoteLinkStep } from '@medusajs/medusa/core-flows';
import { Modules } from '@medusajs/framework/utils';
import DocumentModuleService from '../../modules/document/services/service';
import { DOCUMENT_MODULE } from '../../modules/document';
import { Document } from 'lib/types';

export type StepInput = {
    url: string;
    type: string;
}[];

type WorkflowInput = {
    customer_id: string;
    documents: {
        url: string;
        type: string;
    }[];
};

export const createCustomerDocumentsStep = createStep(
    'create-customer-documents-step',
    async (input: StepInput, { container }) => {
        const documentModuleService: DocumentModuleService = container.resolve(DOCUMENT_MODULE);

        const customerDocuments = await documentModuleService.createDocuments(input);

        const documents = Array.isArray(customerDocuments)
            ? customerDocuments
            : [customerDocuments];

        return new StepResponse(documents, {
            ids: documents.map(document => document.id),
        });
    },

    async (compensationData, { container }) => {
        if (!compensationData?.ids?.length) {
            return;
        }

        const documentModuleService: DocumentModuleService = container.resolve(DOCUMENT_MODULE);

        await documentModuleService.deleteDocuments(compensationData.ids);
    },
);

export const createCustomerDocumentWorkflow = createWorkflow<
    WorkflowInput,
    { documents: Document },
    any
>('create-customer-documents', (input: WorkflowInput) => {
    const documents = createCustomerDocumentsStep(input.documents);

    const links = transform({ documents, input }, ({ documents, input }) =>
        documents.map(doc => ({
            [Modules.CUSTOMER]: {
                customer_id: input.customer_id,
            },
            [DOCUMENT_MODULE]: {
                document_id: doc.id,
            },
        })),
    );

    when({ links }, ({ links }) => !!links?.length).then(() => {
        createRemoteLinkStep(links);
    });

    return new WorkflowResponse({ documents });
});
