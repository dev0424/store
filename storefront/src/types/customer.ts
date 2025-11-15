import { HttpTypes } from "@medusajs/types";
import { BillingAddress } from "@types/billing-address";
import { BankAccount } from "@types/bank-account";
import { CustomerProfile } from "@types/customer-profile";
import { AccountStatus } from "@types/account-status";

export type ExtendedCustomer = HttpTypes.StoreCustomer & {
  bank_account: BankAccount;
  billing_address: BillingAddress;
  customer_profile: CustomerProfile;
  account_status: AccountStatus;
};
