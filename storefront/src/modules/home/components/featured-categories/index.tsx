import React from "react";
import { listCategories } from "@lib/data/categories";
import { filterMainCategories } from "@lib/util/categories";
import Carousel from "@modules/common/components/carousel";
import CategoryPreview from "@modules/home/components/category-preview";

const FeaturedCategories = async () => {
  const product_categories = await listCategories();
  const categories = filterMainCategories(product_categories);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="px-6 text-left text-2xl font-black text-ui-fg-base sm:px-0">
        Top catégories
      </h1>
      <Carousel>
        {categories.map((category) => (
          <CategoryPreview key={category.id} category={category} />
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedCategories;
