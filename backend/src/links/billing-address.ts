import CustomerModule from '@medusajs/medusa/customer';
import BillingAddressModule from 'modules/billing-address';
import { defineLink } from '@medusajs/framework/utils';

export default defineLink(
    {
        linkable: CustomerModule.linkable.customer,
    },
    {
        linkable: BillingAddressModule.linkable.billingAddress,
        deleteCascade: true,
    },
    {
        database: {
            table: 'billing_address_customer',
        },
    },
);
