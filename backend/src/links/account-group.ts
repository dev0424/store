import CustomerModule from '@medusajs/medusa/customer';
import AccountGroupModule from 'modules/account-group';
import { defineLink } from '@medusajs/framework/utils';

export default defineLink(
    {
        linkable: CustomerModule.linkable.customer,
    },
    {
        linkable: AccountGroupModule.linkable.accountGroup,
        deleteCascade: true,
    },
    {
        database: {
            table: 'account_group_customer',
        },
    },
);
