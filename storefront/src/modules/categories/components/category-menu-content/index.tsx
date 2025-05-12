import React from "react";
import { StoreProductCategory } from "@medusajs/types";
import Link from "next/link";
import { hasChildrenCategory } from "@lib/util/categories";

type Props = {
  category: StoreProductCategory;
};

const CategoryMenuContent = ({ category }: Props) => {
  return (
    <ul className="flex list-none gap-8 bg-white p-4 text-black sm:w-max">
      {category.category_children.map((subCategory) => (
        <li key={subCategory.id} className={"flex flex-col gap-2"}>
          <Link
            className={"font-medium"}
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
  );
};

export default CategoryMenuContent;
