import { HttpTypes } from "@medusajs/types";
import { BillingAddress } from "@types/billing-address";
import { BankAccount } from "@types/bank-account";

export type Customer = HttpTypes.StoreCustomer & {
  bank_account: BankAccount;
  billing_address: BillingAddress;
};
