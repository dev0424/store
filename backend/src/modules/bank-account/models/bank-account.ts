import { model } from '@medusajs/framework/utils';

export const BankAccount = model.define('bank_account', {
    id: model.id().primaryKey(),
    bank_name: model.text(),
    bank_code: model.text(),
    branch_code: model.text(),
    city: model.text(),
    address: model.text(),
    account_number: model.text(),
    account_holder: model.text(),
    iban: model.text(),
    bic: model.text(),
    rib_key: model.text(),
});
