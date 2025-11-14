import type { MedusaResponse, AuthenticatedMedusaRequest } from '@medusajs/framework';
import { createCustomerAccountWorkflow } from '@medusajs/medusa/core-flows';
import { createBankAccountWorkflow } from '../../../workflows/create-bank-account';
import {
    BankAccount,
    BillingAddress,
    CustomerProfile,
    ApplicationStatus,
} from '../../../lib/types';
import { CreateCustomerDTO } from '@medusajs/types';
import { createBillingAddressWorkflow } from '../../../workflows/create-billing-address';
import { createCustomerProfileWorkflow } from '../../../workflows/create-customer-profile';
import { createAccountStatusWorkflow } from '../../../workflows/create-account-status';

type CreateCustomerRequest = CreateCustomerDTO & {
    bank_account: BankAccount;
    billing_address: BillingAddress;
    customer_profile: CustomerProfile;
};

const DEFAULT_ACCOUNT_STATUS = {
    application_status: 'PENDING' as ApplicationStatus,
    is_searchable: false,
};

export async function POST(
    request: AuthenticatedMedusaRequest<CreateCustomerRequest>,
    response: MedusaResponse,
) {
    // TODO validate request body
    const customerData = request.body;
    const authIdentityId = request.auth_context.auth_identity_id;

    // Create customer account
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

    // Create billing address and attach to customer account
    const billingAddress = await createBillingAddressWorkflow(request.scope).run({
        input: { customer: createdCustomer, billing_address: customerData.billing_address },
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

    response.send({
        ...createdCustomer,
        ...bankAccount,
        ...billingAddress,
        ...customerProfile,
        ...accountStatus,
    });
}
