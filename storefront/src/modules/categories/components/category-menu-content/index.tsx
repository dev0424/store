import React from "react";
import { StoreProductCategory } from "@medusajs/types";
import Link from "next/link";
import { hasChildrenCategory } from "@lib/util/categories";

type Props = {
  category: StoreProductCategory;
};

const CategoryMenuContent = ({ category }: Props) => {
  return (
    <div className="w-screen bg-background-primary text-ui-fg-on-color">
      <ul className="content-container flex list-none gap-16 py-8">
        {category.category_children.map((subCategory) => (
          <li key={subCategory.id} className={"flex flex-col gap-2"}>
            <Link
              className={"font-black"}
              href={`/categories/${subCategory.handle}`}
            >
              {subCategory.name}
            </Link>
            {hasChildrenCategory(subCategory) ? (
              <div className={"flex flex-col gap-2"}>
                {subCategory.category_children.map((children) => (
                  <Link
                    key={children.id}
                    href={`/categories/${children.handle}`}
                    className={"text-sm"}
                  >
                    {children.name}
                  </Link>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenuContent;
