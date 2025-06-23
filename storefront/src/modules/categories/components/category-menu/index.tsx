import React from "react";
import { StoreProductCategory } from "@medusajs/types";
import { HiChevronDown as ChevronDown } from "react-icons/hi";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { clx } from "@medusajs/ui";
import { hasChildrenCategory } from "@lib/util/categories";

type Props = {
  category: StoreProductCategory;
  isOpen: boolean;
};

const CategoryMenu = ({ category, isOpen }: Props) => {
  if (hasChildrenCategory(category)) {
    return (
      <div className="flex items-center gap-1">
        <LocalizedClientLink href={`/categories/${category.handle}`}>
          {category.name}
        </LocalizedClientLink>
        <ChevronDown
          className={clx(
            "relative top-px -translate-y-[2px] transition-transform duration-200 ease-in",
            {
              "-rotate-180": !isOpen,
            },
          )}
        />
      </div>
    );
  }

  return (
    <LocalizedClientLink href={`/categories/${category.handle}`}>
      {category.name}
    </LocalizedClientLink>
  );
};

export default CategoryMenu;
