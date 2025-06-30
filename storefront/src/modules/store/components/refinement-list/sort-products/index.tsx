"use client";

import FilterRadioGroup from "@modules/common/components/filter-radio-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const sortOptions = [
  {
    value: "created_at",
    label: "Latest arrivals",
  },
  {
    value: "price_asc",
    label: "Price: Low -> High",
  },
  {
    value: "price_desc",
    label: "Price: High -> Low",
  },
];

export type SortOptions = "price_asc" | "price_desc" | "created_at";

type Props = {
  sortBy: SortOptions;
  "data-testid"?: string;
};

const SortProducts = ({ "data-testid": dataTestId, sortBy }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value);
    router.push(`${pathname}?${query}`);
  };

  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value);
  };

  return (
    <FilterRadioGroup
      title="Sort by"
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  );
};

export default SortProducts;
