"use server";

import { sdk } from "@lib/config";
import { getCacheTag, setAuthToken } from "@lib/data/cookies";
import { revalidateTag } from "next/cache";
import { transferCart } from "@lib/data/customer";
import { RegistrationFormValues } from "@modules/account/components/registration-form";
import { ExtendedCustomer } from "@types/customer";

type UploadUrl = {
  url: string;
  key: string;
};

type RegistrationCustomer = ExtendedCustomer & {
  presigned_urls: UploadUrl[];
};

export async function signup(data: RegistrationFormValues) {
  try {
    const token = await sdk.auth.register("customer", "emailpass", {
      email: data.email,
      password: data.password,
    });

    await setAuthToken(token as string);

    const createdCustomer = await sdk.client.fetch<RegistrationCustomer>(
      "/store/customers/registration",
      {
        method: "POST",
        body: {
          ...data,
          files: {
            rib: {
              filename: data.files.rib.name,
            },
            kbis: {
              filename: data.files.kbis.name,
            },
          },
        },
        headers: { authorization: `Bearer ${token}` },
      },
    );

    await uploadFiles(createdCustomer.presigned_urls, data.files);

    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: data.email,
      password: data.password,
    });

    await setAuthToken(loginToken as string);

    const customerCacheTag = await getCacheTag("customers");

    revalidateTag(customerCacheTag);

    await transferCart();
  } catch (error: any) {
    return error.toString();
  }
}

const uploadFiles = async (
  uploadUrls: UploadUrl[],
  files: { rib: File; kbis: File },
) => {
  // Create a map from filename to presigned URL
  const presignedMapByName = uploadUrls.reduce(
    (acc, file) => {
      const filename = file.key.split("/").pop();
      acc[filename] = file.url;
      return acc;
    },
    {} as Record<string, string>,
  );

  // Upload each file
  for (const [_, file] of Object.entries(files)) {
    const url = presignedMapByName[file.name];

    if (!url) {
      console.warn(`No presigned URL found for ${file.name}`);
      continue;
    }

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.ok) {
        console.log(`Upload successful for ${file.name}`);
      } else {
        console.error(
          `Upload failed for ${file.name}`,
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error(`Error uploading ${file.name}:`, error);
    }
  }
};
