import { NextResponse } from "next/server";
import { isMaintenanceMode } from "@lib/util/system-flag";

const SYSTEM_FLAGS_REVALIDATION = 60;

export async function GET() {
  const isMaintenance = await isMaintenanceMode(SYSTEM_FLAGS_REVALIDATION);

  return NextResponse.json({ isMaintenance });
}
