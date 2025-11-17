import type { MedusaResponse, AuthenticatedMedusaRequest } from '@medusajs/framework';
import { createCustomerAccountWorkflow } from '@medusajs/medusa/core-flows';
import { createBankAccountWorkflow } from '../../../workflows/create-bank-account';
import { BankAccount, CustomerProfile, ApplicationStatus } from '../../../lib/types';
import { CreateCustomerDTO } from '@medusajs/types';
import { createCustomerProfileWorkflow } from '../../../workflows/create-customer-profile';
import { createAccountStatusWorkflow } from '../../../workflows/create-account-status';
import { createLocationWorkflow } from '../../../workflows/create-location';

type CreateCustomerRequest = CreateCustomerDTO & {
    bank_account: BankAccount;
    customer_profile: CustomerProfile;
};

const DEFAULT_ACCOUNT_STATUS = {
    application_status: 'PENDING' as ApplicationStatus,
    is_searchable: false,
};

const DEFAULT_LOCATION = {
    latitude: null,
    longitude: null,
};

export async function POST(
    request: AuthenticatedMedusaRequest<CreateCustomerRequest>,
    response: MedusaResponse,
) {
    // TODO validate request body
    const customerData = request.body;
    const authIdentityId = request.auth_context.auth_identity_id;

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

    response.send({
        ...createdCustomer,
        ...bankAccount,
        ...customerProfile,
        ...accountStatus,
        ...location,
    });
}
