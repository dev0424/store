import { model } from '@medusajs/framework/utils';

export const CustomerProfile = model.define('customer_profile', {
    id: model.id().primaryKey(),
    vat_number: model.text(),
    siret_number: model.text(),
    ape_code: model.text(),
    activity: model.text(),
    billing_cycle: model.text(),
    payment_method: model.text(),
    invoice_email: model.text(),
    revenue_previous_year: model.float().nullable(),
    employee_count: model.number().nullable(),
});
