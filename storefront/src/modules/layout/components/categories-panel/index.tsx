import React from "react";
import BackwardButton from "@modules/layout/components/backward-button";
import ProductCategories from "@modules/layout/components/product-categories";
import { StoreProductCategory } from "@medusajs/types";
import Divider from "@modules/common/components/divider";

type Props = {
  currentCategory: StoreProductCategory | null;
  rootCategories: StoreProductCategory[];
  onNavigateForward: (category: StoreProductCategory) => void;
  onNavigateBackward: VoidFunction;
  onClick: VoidFunction;
};

const CategoriesPanel = ({
  currentCategory,
  onNavigateForward,
  rootCategories,
  onNavigateBackward,
  onClick,
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <BackwardButton
          onClick={onNavigateBackward}
          title={currentCategory?.name || "Back"}
        />
        <Divider className="mt-2 border-background-secondary" />
      </div>
      <ProductCategories
        categories={
          currentCategory?.category_children || rootCategories // root or current category children
        }
        onNavigateForward={onNavigateForward}
        onClick={onClick}
      />
    </div>
  );
};

export default CategoriesPanel;
