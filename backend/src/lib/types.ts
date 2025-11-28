import { AdminCustomer, AdminProduct } from '@medusajs/types';

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
    id: string;
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
    id: string;
    address_1: string;
    address_2?: string;
    postal_code: string;
    city: string;
    country_code: string;
    province?: string;
};

export type CustomerProfile = {
    id: string;
    vat_number: string;
    siret_number: string;
    ape_code: string;
    activity: string;
    billing_cycle: string;
    payment_method: string;
    invoice_email: string;
};

export type Location = {
    id?: string;
    latitude: number | null;
    longitude: number | null;
};

export type AccountStatus = {
    id?: string;
    application_status: ApplicationStatus;
    is_searchable: boolean;
};

export type AdminCustomerExtended = {
    customer: AdminCustomer & {
        bank_account: BankAccount;
        billing_address: BillingAddress;
        customer_profile: CustomerProfile;
        account_status: AccountStatus;
        location: Location;
    };
};

export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'DECLINED';

export type SystemFlag = {
    id: string;
    key: string;
    value: string;
    name: string;
};

export type ContactForm = {
    first_name: string;
    last_name: string;
    phone?: string;
    email: string;
    message: string;
};

export type PasswordResetRequest = {
    reset_url: string;
    email: string;
};

export type Activity = {
    id: string;
    name: string;
};

export type CustomPaymentMethod = {
    id: string;
    name: string;
};

export type BillingCycle = {
    id: string;
    name: string;
};
