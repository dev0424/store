"use server";

import { getSystemFlags } from "@lib/data/system";

export const isMaintenanceMode = async (ttl: number) => {
  const systemFlags = await getSystemFlags(ttl);

  return !!systemFlags.find(
    (systemFlag) =>
      systemFlag.key === "maintenance_mode" && systemFlag.value === "true",
  );
};
