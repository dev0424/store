import { sdk } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
import { CustomPaymentMethod } from "@types/custom-payment-method";

export const getCustomPaymentMethods = async () => {
  return sdk.client
    .fetch<{ customPaymentMethods: CustomPaymentMethod[] }>(
      "/store/custom-payment-methods",
    )
    .catch(medusaError)
    .then(({ customPaymentMethods }) => customPaymentMethods);
};
