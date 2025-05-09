import React from "react";
import { StoreProductCategory } from "@medusajs/types";
import { ChevronDown } from "@medusajs/icons";
import Link from "next/link";

type Props = {
  category: StoreProductCategory;
};

const CategoryMenu = ({ category }: Props) => {
  return (
    <div className="flex gap-1">
      <Link href={`/categories/${category.handle}`}>{category.name}</Link>
      <ChevronDown
        className="duration-[250] relative top-px transition-transform ease-in group-data-[state=open]:-rotate-180"
        aria-hidden
      />
    </div>
  );
};

export default CategoryMenu;
