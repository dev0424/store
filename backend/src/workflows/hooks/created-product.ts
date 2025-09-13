import { createProductsWorkflow } from '@medusajs/medusa/core-flows';
import { StepResponse } from '@medusajs/framework/workflows-sdk';
import { Modules } from '@medusajs/framework/utils';
import { LinkDefinition } from '@medusajs/framework/types';
import ProductDocumentModuleService from '../../modules/product-document/services/service';
import { PRODUCT_DOCUMENT_MODULE } from '../../modules/product-document/index';

createProductsWorkflow.hooks.productsCreated(
    async ({ products, additional_data }, { container }) => {
        if (!additional_data?.product_document_id) {
            return new StepResponse([], []);
        }

        const productDocumentModuleService: ProductDocumentModuleService =
            container.resolve(PRODUCT_DOCUMENT_MODULE);

        // if the product document doesn't exist, an error is thrown.
        await productDocumentModuleService.retrieveProductDocument(
            additional_data.product_document_id as string,
        );

        const link = container.resolve('link');
        const logger = container.resolve('logger');

        const links: LinkDefinition[] = [];

        for (const product of products) {
            links.push({
                [Modules.PRODUCT]: {
                    product_id: product.id,
                },
                [PRODUCT_DOCUMENT_MODULE]: {
                    product_document_id: additional_data.product_document_id,
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
