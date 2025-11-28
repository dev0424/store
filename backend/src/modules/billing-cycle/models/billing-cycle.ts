import { model } from '@medusajs/framework/utils';

export const BillingCycle = model.define('billing_cycle', {
    id: model.id().primaryKey(),
    name: model.text(),
});
