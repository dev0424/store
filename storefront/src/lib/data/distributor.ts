"use server";

import { sdk } from "../../lib/config";
import { Distributor } from "@types/distributor";

export const listDistributors = async (): Promise<Distributor[]> => {
  return await sdk.client
    .fetch<{ distributors: Distributor[] }>(`/store/distributors`)
    .then((response) => response.distributors);
};
