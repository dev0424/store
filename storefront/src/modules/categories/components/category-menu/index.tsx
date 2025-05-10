import React from "react";
import { StoreProductCategory } from "@medusajs/types";
import { HiChevronDown as ChevronDown } from "react-icons/hi";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

type Props = {
  category: StoreProductCategory;
};

const CategoryMenu = ({ category }: Props) => {
  return (
    <div className="flex gap-1">
      <LocalizedClientLink href={`/categories/${category.handle}`}>
        {category.name}
      </LocalizedClientLink>
      <ChevronDown
        className="duration-[250] relative top-px transition-transform ease-in group-data-[state=open]:-rotate-180"
        aria-hidden
      />
    </div>
  );
};

export default CategoryMenu;
