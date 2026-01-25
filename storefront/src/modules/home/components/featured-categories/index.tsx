import React from "react";
import { listCategories } from "@lib/data/categories";
import { filterMainCategories } from "@lib/util/categories";
import CategoryPreview from "@modules/home/components/category-preview";

const FeaturedCategories = async () => {
  const product_categories = await listCategories();
  const categories = filterMainCategories(product_categories);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-left text-2xl font-black text-ui-fg-base">
        Top catégories
      </h1>
      <div className="grid w-full grid-cols-2 gap-4 sm:w-max sm:grid-cols-4">
        {categories.map((category) => (
          <CategoryPreview key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
