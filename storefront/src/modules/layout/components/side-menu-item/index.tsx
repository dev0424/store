import { StoreProductCategory } from "@medusajs/types";
import React from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { hasChildrenCategory } from "@lib/util/categories";
import ForwardButton from "@modules/layout/components/forward-button";

type Props = {
  category: StoreProductCategory;
  onNavigateForward: (category: StoreProductCategory) => void;
  onClick: VoidFunction;
};

const SideMenuItem = ({ category, onNavigateForward, onClick }: Props) => {
  if (hasChildrenCategory(category)) {
    return (
      <ForwardButton
        onClick={() => onNavigateForward(category)}
        title={category.name}
      />
    );
  }

  return (
    <LocalizedClientLink
      href={`/categories/${category.handle}`}
      className="text-lg leading-10 hover:text-accent-primary"
      onClick={onClick}
    >
      {category.name}
    </LocalizedClientLink>
  );
};

export default SideMenuItem;
