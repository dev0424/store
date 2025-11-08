import CustomerModule from '@medusajs/medusa/customer';
import CustomerProfileModule from 'modules/customer-profile';
import { defineLink } from '@medusajs/framework/utils';

export default defineLink(
    {
        linkable: CustomerModule.linkable.customer,
    },
    {
        linkable: CustomerProfileModule.linkable.customerProfile,
        deleteCascade: true,
    },
    {
        database: {
            table: 'customer_profile_customer',
        },
    },
);
