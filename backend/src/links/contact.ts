import CustomerModule from '@medusajs/medusa/customer';
import ContactPersonModule from 'modules/contact';
import { defineLink } from '@medusajs/framework/utils';

export default defineLink(
    {
        linkable: CustomerModule.linkable.customer,
        isList: true,
    },
    {
        linkable: ContactPersonModule.linkable.contact,
        deleteCascade: true,
        isList: true,
    },
    {
        database: {
            table: 'contact_customer',
        },
    },
);
