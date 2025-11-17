import CustomerModule from '@medusajs/medusa/customer';
import LocationModule from 'modules/location';
import { defineLink } from '@medusajs/framework/utils';

export default defineLink(
    {
        linkable: CustomerModule.linkable.customer,
    },
    {
        linkable: LocationModule.linkable.location,
        deleteCascade: true,
    },
    {
        database: {
            table: 'location_customer',
        },
    },
);
