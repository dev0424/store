import React from "react";
import SideMenuItem from "@modules/layout/components/side-menu-item";
import { StoreProductCategory } from "@medusajs/types";

type Props = {
  categories: StoreProductCategory[];
  onNavigateForward: (category: StoreProductCategory) => void;
  onClick: VoidFunction;
};

const ProductCategories = ({
  categories,
  onNavigateForward,
  onClick,
}: Props) => {
  return (
    <div className={"flex flex-col"}>
      {categories.map((category) => (
        <SideMenuItem
          key={category.id}
          category={category}
          onNavigateForward={onNavigateForward}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default ProductCategories;
