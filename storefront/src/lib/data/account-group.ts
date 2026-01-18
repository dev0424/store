"use server";

import { getAuthHeaders, getCacheTag } from "@lib/data/cookies";
import { sdk } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
import { revalidateTag } from "next/cache";
import { CustomerProfile } from "@types/customer-profile";
import { AccountGroup } from "@types/account-group";

export const patchAccountGroup = async (body: Partial<AccountGroup>) => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  const response = await sdk.client
    .fetch<CustomerProfile>("/store/customers/me/account-group", {
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

export const updateAccountGroup = async (
  _currentState: Record<string, unknown>,
  formData: FormData,
) => {
  const accountGroup: Record<string, any> = {};

  formData.forEach((value, key) => {
    if (typeof value === "string") {
      // Parse true / false values to boolean
      if (value === "true") {
        accountGroup[key] = true;
      } else if (value === "false") {
        accountGroup[key] = false;
      } else {
        accountGroup[key] = value;
      }
    }
  });

  try {
    await patchAccountGroup(accountGroup);

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
