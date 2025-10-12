"use client";

import React from "react";
import { StoreProductCategory } from "@medusajs/types";
import Checkbox from "@modules/common/components/checkbox";
import { useSearchParams } from "next/navigation";
import { useToggleQueryParam } from "@lib/hooks/use-toggle-query-param";

type Props = {
  categories: StoreProductCategory[];
};

const CategoryFilter = ({ categories }: Props) => {
  const toggle = useToggleQueryParam();
  const searchParams = useSearchParams();

  const onChange = (categoryId: string) => toggle("categoryId", categoryId);

  return (
    <div className="text-base-large flex flex-col gap-3">
      <p className="font-black">Catégories</p>
      <ul className="grid grid-cols-1 gap-2">
        {categories.map((category) => {
          const isChecked = searchParams
            .getAll("categoryId")
            ?.includes(category.id);

          return (
            <Checkbox
              key={category.id}
              label={category.name}
              name={category.id}
              checked={isChecked}
              onChange={() => onChange(category.id)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryFilter;
