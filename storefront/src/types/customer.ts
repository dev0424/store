import { HttpTypes } from "@medusajs/types";
import { BankAccount } from "@types/bank-account";
import { CustomerProfile } from "@types/customer-profile";
import { AccountStatus } from "@types/account-status";
import { Location } from "@types/location";

export type ExtendedCustomer = HttpTypes.StoreCustomer & {
  bank_account: BankAccount;
  customer_profile: CustomerProfile;
  account_status: AccountStatus;
  location: Location;
};
