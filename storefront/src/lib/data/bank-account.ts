"use server";

import { getAuthHeaders, getCacheTag } from "@lib/data/cookies";
import { sdk } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
import { revalidateTag } from "next/cache";
import { BankAccount } from "@types/bank-account";

export const patchBankAccount = async (body: Partial<BankAccount>) => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  const response = await sdk.client
    .fetch<BankAccount>("/store/customers/me/bank-account", {
      method: "PATCH",
      body,
      headers,
    })
    .then((bankAccount) => bankAccount)
    .catch(medusaError);

  const cacheTag = await getCacheTag("customers");
  revalidateTag(cacheTag);

  return response;
};

export const updateBankAccount = async (
  _currentState: Record<string, unknown>,
  formData: FormData,
) => {
  const bankAccount: Record<string, string> = {};

  formData.forEach((value, key) => {
    if (typeof value === "string") {
      bankAccount[key] = value;
    }
  });

  try {
    await patchBankAccount(bankAccount);

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
