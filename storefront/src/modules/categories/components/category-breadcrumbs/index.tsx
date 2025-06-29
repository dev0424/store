import React from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { StoreProductCategory } from "@medusajs/types";

const getParents = (category: StoreProductCategory) => {
  const parents = [] as StoreProductCategory[];

  if (category.parent_category) {
    parents.push(category.parent_category);
    getParents(category.parent_category);
  }

  return parents;
};

type Props = {
  category: StoreProductCategory;
};

const CategoryBreadcrumbs = ({ category }: Props) => {
  const parents = getParents(category);

  return (
    <div className="mb-8 flex flex-row gap-2 text-sm">
      {parents &&
        parents.map((parent) => (
          <span key={parent.id} className="text-ui-fg-subtle">
            <LocalizedClientLink
              className="mr-2 hover:text-black"
              href={`/categories/${parent.handle}`}
              data-testid="sort-by-link"
            >
              {parent.name}
            </LocalizedClientLink>
            /
          </span>
        ))}
      <h1 data-testid="category-page-title" className={"font-bold"}>
        {category.name}
      </h1>
    </div>
  );
};

export default CategoryBreadcrumbs;
