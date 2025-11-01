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

export type BankAccount = {
    bank_name: string;
    bank_code: string;
    branch_code: string;
    city: string;
    address: string;
    account_number: string;
    account_holder: string;
    iban: string;
    bic: string;
    rib_key: string;
};

export type BillingAddress = {
    address_1: string;
    address_2?: string;
    postal_code: string;
    city: string;
    country_code: string;
    province?: string;
};
