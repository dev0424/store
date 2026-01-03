import type { MedusaResponse, AuthenticatedMedusaRequest } from '@medusajs/framework';
import { createCustomerAccountWorkflow } from '@medusajs/medusa/core-flows';
import { createBankAccountWorkflow } from '../../../../workflows/create-bank-account';
import {
    BankAccount,
    CustomerProfile,
    ApplicationStatus,
    AccountGroup,
    Contact,
} from '../../../../lib/types';
import { CreateCustomerDTO } from '@medusajs/types';
import { createCustomerProfileWorkflow } from '../../../../workflows/create-customer-profile';
import { createAccountStatusWorkflow } from '../../../../workflows/account-status/create-account-status';
import { createLocationWorkflow } from '../../../../workflows/location/create-location';
import { Modules } from '@medusajs/framework/utils';
import { createCustomerDocumentWorkflow } from '../../../../workflows/document/create-customer-document';
import { createAccountGroupWorkflow } from '../../../../workflows/account-group/create-account-group';
import { createContactsWorkflow } from '../../../../workflows/contact/create-contact';

type CreateCustomerRequest = CreateCustomerDTO & {
    bank_account: BankAccount;
    customer_profile: CustomerProfile;
    files: {
        rib: {
            filename: string;
        };
        kbis: {
            filename: string;
        };
    };
    account_group: AccountGroup;
    contacts: Contact[];
};

const DEFAULT_ACCOUNT_STATUS = {
    application_status: 'PENDING' as ApplicationStatus,
    is_searchable: false,
};

const DEFAULT_LOCATION = {
    latitude: null,
    longitude: null,
    address_1: null,
    address_2: null,
    city: null,
    country_code: null,
    province: null,
    postal_code: null,
    phone: null,
    email: null,
};

export async function POST(
    request: AuthenticatedMedusaRequest<CreateCustomerRequest>,
    response: MedusaResponse,
) {
    // TODO validate request body
    const customerData = request.body;
    const authIdentityId = request.auth_context.auth_identity_id;
    const fileModuleService = request.scope.resolve(Modules.FILE);

    // Create customer account with addresses
    const { result: createdCustomer } = await createCustomerAccountWorkflow(request.scope).run({
        input: {
            authIdentityId,
            customerData: {
                ...customerData,
                metadata: {
                    ...customerData.metadata,
                },
            },
        },
    });

    // Create bank account and attach to customer account
    const bankAccount = await createBankAccountWorkflow(request.scope).run({
        input: { customer: createdCustomer, bank_account: customerData.bank_account },
    });

    // Create customer profile and attach to customer account
    const customerProfile = await createCustomerProfileWorkflow(request.scope).run({
        input: { customer: createdCustomer, customer_profile: customerData.customer_profile },
    });

    // Create account status and attach to customer account
    const accountStatus = await createAccountStatusWorkflow(request.scope).run({
        input: {
            customer: createdCustomer,
            account_status: DEFAULT_ACCOUNT_STATUS,
        },
    });

    // Create location and attach to customer account
    const location = await createLocationWorkflow(request.scope).run({
        input: {
            customer: createdCustomer,
            location: DEFAULT_LOCATION,
        },
    });

    // Create account group and attach to customer account
    const accountGroup = await createAccountGroupWorkflow(request.scope).run({
        input: {
            customer: createdCustomer,
            account_group: customerData.account_group,
        },
    });

    // Create customer documents and attach to customer account
    const customerDocuments = await createCustomerDocumentWorkflow(request.scope).run({
        input: {
            customer_id: createdCustomer.id,
            documents: [
                {
                    url: `private/customers/${createdCustomer.id}/${customerData.files.rib.filename}`,
                    type: 'rib',
                },
                {
                    url: `private/customers/${createdCustomer.id}/${customerData.files.kbis.filename}`,
                    type: 'kbis',
                },
            ],
        },
    });

    // Create contacts and attach to customer account
    const contacts = await createContactsWorkflow(request.scope).run({
        input: {
            customer: createdCustomer,
            contacts: customerData.contacts,
        },
    });

    // Generate presigned upload url for storefront
    const presignedUrls = await fileModuleService.getUploadFileUrls([
        {
            filename: `private/customers/${createdCustomer.id}/${customerData.files.rib.filename}`,
        },
        {
            filename: `private/customers/${createdCustomer.id}/${customerData.files.kbis.filename}`,
        },
    ]);

    response.send({
        ...createdCustomer,
        ...bankAccount,
        ...customerProfile,
        ...accountStatus,
        ...location,
        ...customerDocuments,
        ...accountGroup,
        ...contacts,
        presigned_urls: presignedUrls,
    });
}
