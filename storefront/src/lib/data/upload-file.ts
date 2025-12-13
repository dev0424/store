"use server";

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

export const uploadFile = async (
  files: File[],
): Promise<{ id: string; url: string }[]> => {
  // todo handle missing env

  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  return fetch(`${BACKEND_URL}/store/register/files`, {
    method: "POST",
    body: formData,
    headers: {
      "x-publishable-api-key": PUBLISHABLE_API_KEY!,
    },
  }).then((res) => res.json());
};
