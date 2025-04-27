"use server"

import { sdk } from "@lib/config"
import { redirect } from "next/navigation"

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get("password") as string
  const customerData = {
    email: formData.get("email") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
    company_name: formData.get("company_name") as string,
    metadata: {
      tax_number: formData.get("tax_number"),
      approved: false,
    },
  }

  try {
    const token = await sdk.auth.register("customer", "emailpass", {
      email: customerData.email,
      password: password,
    })

    const customHeaders = { authorization: `Bearer ${token}` }

    await sdk.store.customer.create(customerData, {}, customHeaders)
  } catch (error: any) {
    return error.toString()
  }

  redirect("/account/pending")
}
