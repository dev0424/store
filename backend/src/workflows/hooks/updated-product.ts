import { updateProductsWorkflow } from '@medusajs/medusa/core-flows';
import { StepResponse } from '@medusajs/framework/workflows-sdk';
import { Modules } from '@medusajs/framework/utils';
import { LinkDefinition } from '@medusajs/framework/types';
import DocumentModuleService from '../../modules/document/services/service';
import { DOCUMENT_MODULE } from '../../modules/document/index';

/*
 * Workflow hook which runs when a product is updated.
 * It attaches document id (if found) to the product when uploading product documents from the admin panel.
 */
updateProductsWorkflow.hooks.productsUpdated(
    // Link product document ids to product
    async ({ products, additional_data }, { container }) => {
        if (!additional_data?.product_document_id) {
            return;
        }

        const product_document_id = additional_data?.product_document_id as string;

        const documentModuleService: DocumentModuleService = container.resolve(DOCUMENT_MODULE);

        // Validate product document id exist
        await documentModuleService.retrieveDocument(product_document_id);

        const link = container.resolve('link');
        const logger = container.resolve('logger');

        const links: LinkDefinition[] = [];

        for (const product of products) {
            links.push({
                [Modules.PRODUCT]: {
                    product_id: product.id,
                },
                [DOCUMENT_MODULE]: {
                    document_id: product_document_id,
                },
            });
        }

        await link.create(links);

        logger.info('Linked product document to products');

        return new StepResponse(links, links);
    },
    // Compensation function
    async (links, { container }) => {
        if (!links?.length) {
            return;
        }

        const link = container.resolve('link');

        await link.dismiss(links);
    },
);
