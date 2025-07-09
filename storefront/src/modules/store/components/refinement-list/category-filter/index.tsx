"use client";

import React from "react";
import { StoreProductCategory } from "@medusajs/types";
import Checkbox from "@modules/common/components/checkbox";
import { useSearchParams } from "next/navigation";
import { useToggleQueryParam } from "@lib/hooks/use-toggle-query-param";

type Props = {
  category: StoreProductCategory;
};

const CategoryFilter = ({ category }: Props) => {
  const toggle = useToggleQueryParam();
  const searchParams = useSearchParams();

  const onChange = (categoryId: string) => toggle("categoryId", categoryId);

  return (
    <div className="text-base-large flex flex-col gap-3">
      <p className="font-black">Categories</p>
      <ul className="grid grid-cols-1 gap-2">
        {category.category_children?.map((childCategory) => {
          const isChecked = searchParams
            .getAll("categoryId")
            ?.includes(childCategory.id);

          return (
            <Checkbox
              key={childCategory.id}
              label={childCategory.name}
              name={childCategory.id}
              checked={isChecked}
              onChange={() => onChange(childCategory.id)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryFilter;
