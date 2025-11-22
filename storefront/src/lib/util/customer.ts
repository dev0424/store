import { ExtendedCustomer } from "@types/customer";

export const isCustomerApproved = (customer: ExtendedCustomer | null) => {
  if (!customer) {
    return false;
  }

  return customer.account_status.application_status === "APPROVED";
};
