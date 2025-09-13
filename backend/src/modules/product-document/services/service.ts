import { MedusaService } from '@medusajs/framework/utils';
import { ProductDocument } from 'modules/product-document/models/product-document';

class ProductDocumentModuleService extends MedusaService({
    ProductDocument,
}) {}

export default ProductDocumentModuleService;
