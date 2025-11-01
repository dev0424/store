import type { MedusaResponse, AuthenticatedMedusaRequest } from '@medusajs/framework';
import { createCustomerAccountWorkflow } from '@medusajs/medusa/core-flows';
import { createBankAccountWorkflow } from 'workflows/create-bank-account';
import { BankAccount, BillingAddress } from 'lib/types';
import { CreateCustomerDTO } from '@medusajs/types';
import { createBillingAddressWorkflow } from 'workflows/create-billing-address';

type CreateCustomerRequest = CreateCustomerDTO & {
    bank_account: BankAccount;
    billing_address: BillingAddress;
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
                    status: 'pending',
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

    response.send({ ...createdCustomer, ...bankAccount, ...billingAddress });
}
