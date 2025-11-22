"use server";

import { sdk } from "@lib/config";
import { getAuthHeaders } from "@lib/data/cookies";

export const submitContactForm = async (
  _currentState: Record<string, unknown>,
  formData: FormData,
) => {
  const authHeaders = await getAuthHeaders();

  const headers = {
    ...authHeaders,
  };
  return await sdk.client
    .fetch(`/store/contact`, {
      method: "POST",
      headers,
      body: {
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
      },
    })
    .then(() => ({ success: true, error: null }))
    .catch((error) => ({ success: false, error: error.toString() }));
};
