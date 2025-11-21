"use server";

import { sdk } from "@lib/config";
import { getAuthHeaders } from "./cookies";
import { SystemFlag } from "@types/system";

export const getSystemFlags = async (ttl: number): Promise<SystemFlag[]> => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  return sdk.client
    .fetch<{ system_flags: SystemFlag[] }>("/store/system-flag", {
      method: "GET",
      next: { revalidate: ttl },
      headers,
    })
    .then(({ system_flags }) => system_flags);
};
