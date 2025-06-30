"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useToggleQueryParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (paramKey: string, paramValue: string) => {
      const currentValues = searchParams.getAll(paramKey);

      const isValuePresent = currentValues.includes(paramValue);

      // Toggle param value in the list
      const updatedValues = isValuePresent
        ? currentValues.filter((v) => v !== paramValue)
        : [...currentValues, paramValue];

      const params = new URLSearchParams(searchParams.toString());

      // Remove existing key to replace with updated values
      params.delete(paramKey);
      updatedValues.forEach((v) => params.append(paramKey, v));

      // Construct new URL and push
      const newUrl = `${pathname}?${params.toString()}`;

      router.replace(newUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );
};
