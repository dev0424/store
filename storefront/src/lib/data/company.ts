"use server"

import { sdk } from "@lib/config"
import { setAuthToken } from "@lib/data/cookies"
import { revalidateTag } from "next/cache"

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get("password") as string
  const customerForm = {
    email: formData.get("email") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
    company_name: formData.get("company_name") as string,
    metadata: {
      tax_number: formData.get("tax_number"),
    },
  }

  try {
    const token = await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password: password,
    })

    const createdCustomer = await sdk.client.fetch("/store/company", {
      method: "POST",
      body: customerForm,
      headers: { authorization: `Bearer ${token}` },
    })

    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: customerForm.email,
      password,
    })

    setAuthToken(
      typeof loginToken === "string" ? loginToken : loginToken.location
    )

    revalidateTag("customer")
    return createdCustomer
  } catch (error: any) {
    return error.toString()
  }
}
