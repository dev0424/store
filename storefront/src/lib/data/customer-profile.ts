"use server";

import { getAuthHeaders, getCacheTag } from "@lib/data/cookies";
import { sdk } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
import { revalidateTag } from "next/cache";
import { CustomerProfile } from "@types/customer-profile";

export const patchCustomerProfile = async (body: Partial<CustomerProfile>) => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  const response = await sdk.client
    .fetch<CustomerProfile>("/store/customers/me/customer-profile", {
      method: "PATCH",
      body,
      headers,
    })
    .then((customerProfile) => customerProfile)
    .catch(medusaError);

  const cacheTag = await getCacheTag("customers");
  revalidateTag(cacheTag);

  return response;
};

export const updateCustomerProfile = async (
  _currentState: Record<string, unknown>,
  formData: FormData,
) => {
  const customerProfile: Record<string, string> = {};

  formData.forEach((value, key) => {
    if (typeof value === "string") {
      customerProfile[key] = value;
    }
  });

  try {
    await patchCustomerProfile(customerProfile);

    return {
      success: true,
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.toString(),
    };
  }
};
