import { AdminProduct } from '@medusajs/types';

export type ProductDocument = {
    id: string;
    type: string;
    name?: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
};

export type AdminProductWithDocument = {
    product: AdminProduct & {
        product_document?: ProductDocument[];
    };
};
