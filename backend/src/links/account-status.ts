import CustomerModule from '@medusajs/medusa/customer';
import AccountStatusModule from 'modules/account-status';
import { defineLink } from '@medusajs/framework/utils';

export default defineLink(
    {
        linkable: CustomerModule.linkable.customer,
    },
    {
        linkable: AccountStatusModule.linkable.accountStatus,
        deleteCascade: true,
    },
    {
        database: {
            table: 'account_status_customer',
        },
    },
);
