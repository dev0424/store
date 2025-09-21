import React from "react";
import { listCategories } from "@lib/data/categories";
import { filterMainCategories } from "@lib/util/categories";
import CategoryMenuItem from "@modules/categories/components/category-menu-item";

const CategoryNavigation = async () => {
  const product_categories = await listCategories();
  const categories = filterMainCategories(product_categories);

  return (
    <div className="flex">
      {categories.map((category) => (
        <CategoryMenuItem category={category} key={category.id} />
      ))}
    </div>
  );
};

export default CategoryNavigation;
