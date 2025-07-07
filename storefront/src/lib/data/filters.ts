"use server";

import { cookies as nextCookies } from "next/headers";

export const getShowFiltersCookie = async () => {
  const cookies = await nextCookies();
  const cookieValue = cookies.get("showFilters")?.value;
  return cookieValue != null ? cookieValue === "true" : true;
};

export const setShowFiltersCookie = async (value: boolean) => {
  const cookies = await nextCookies();
  cookies.set("showFilters", value ? "true" : "false", {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: false,
  });
};
