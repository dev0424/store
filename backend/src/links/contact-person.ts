import CustomerModule from '@medusajs/medusa/customer';
import ContactPersonModule from 'modules/contact-person';
import { defineLink } from '@medusajs/framework/utils';

export default defineLink(
    {
        linkable: CustomerModule.linkable.customer,
    },
    {
        linkable: ContactPersonModule.linkable.contactPerson,
        deleteCascade: true,
        isList: true,
    },
    {
        database: {
            table: 'contact_person_customer',
        },
    },
);
