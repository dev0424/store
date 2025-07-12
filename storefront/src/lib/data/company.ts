"use server";

import { sdk } from "@lib/config";
import { getCacheTag, setAuthToken } from "@lib/data/cookies";
import { revalidateTag } from "next/cache";
import { transferCart } from "@lib/data/customer";
import { SignupFormData } from "@modules/account/components/company-registration-form";

export async function signup(customerForm: SignupFormData) {
  try {
    const token = await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password: customerForm.password,
    });

    await setAuthToken(token as string);

    const createdCustomer = await sdk.client.fetch("/store/company", {
      method: "POST",
      body: customerForm,
      headers: { authorization: `Bearer ${token}` },
    });

    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: customerForm.email,
      password: customerForm.password,
    });

    await setAuthToken(loginToken as string);

    const customerCacheTag = await getCacheTag("customers");

    revalidateTag(customerCacheTag);

    await transferCart();
    // return createdCustomer;
  } catch (error: any) {
    return error.toString();
  }
}
