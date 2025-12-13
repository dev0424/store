"use server";

import { getAuthHeaders } from "@lib/data/cookies";

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

export const uploadFile = async (
  files: File[],
): Promise<{ id: string; url: string }[]> => {
  if (!BACKEND_URL) {
    throw new Error(
      "Backend url is missing. Set NEXT_PUBLIC_MEDUSA_BACKEND_URL environment variable.",
    );
  }

  if (!PUBLISHABLE_API_KEY) {
    throw new Error(
      "Publishable api key is missing. Set NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY environment variable.",
    );
  }

  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const headers = {
    ...(await getAuthHeaders()),
    "x-publishable-api-key": PUBLISHABLE_API_KEY!,
  };

  return fetch(`${BACKEND_URL}/store/customers/me/files`, {
    method: "POST",
    body: formData,
    headers,
  }).then((res) => res.json());
};
