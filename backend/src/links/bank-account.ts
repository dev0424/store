import CustomerModule from '@medusajs/medusa/customer';
import BankAccountModule from 'modules/bank-account';
import { defineLink } from '@medusajs/framework/utils';

export default defineLink(
    {
        linkable: CustomerModule.linkable.customer,
    },
    {
        linkable: BankAccountModule.linkable.bankAccount,
        deleteCascade: true,
    },
    {
        database: {
            table: 'bank_account_customer',
        },
    },
);
