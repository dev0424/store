import { sdk } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
import { BillingCycle } from "@types/billing-cycle";

export const getBillingCycles = async () => {
  return sdk.client
    .fetch<{ billingCycles: BillingCycle[] }>("/store/billing-cycle")
    .catch(medusaError)
    .then(({ billingCycles }) => billingCycles);
};
