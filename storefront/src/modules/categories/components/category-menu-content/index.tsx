import React from "react";
import { StoreProductCategory } from "@medusajs/types";
import { hasChildrenCategory } from "@lib/util/categories";
import Thumbnail from "@modules/products/components/thumbnail";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

type Props = {
  category: StoreProductCategory;
  onClick: VoidFunction;
};

const CategoryMenuContent = ({ category, onClick }: Props) => {
  return (
    <div>
      <div className="relative z-0 w-screen bg-background-primary text-ui-fg-on-color">
        <ul className="content-container flex list-none gap-8 py-8">
          {category.category_children.map((subCategory) => (
            <li key={subCategory.id}>
              <LocalizedClientLink
                className="flex flex-col gap-2 font-normal"
                href={`/categories/${subCategory.handle}`}
                onClick={onClick}
              >
                <Thumbnail
                  thumbnail={subCategory.metadata?.thumbnail as string}
                  size="square"
                  className="rounded-md object-cover sm:h-40 sm:w-40"
                />
                {subCategory.name}
              </LocalizedClientLink>
              {hasChildrenCategory(subCategory) ? (
                <div className="flex flex-col gap-2">
                  {subCategory.category_children.map((children) => (
                    <LocalizedClientLink
                      key={children.id}
                      href={`/categories/${children.handle}`}
                      className="text-sm"
                    >
                      {children.name}
                    </LocalizedClientLink>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryMenuContent;
