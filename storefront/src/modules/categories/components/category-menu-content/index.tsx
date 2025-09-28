import React from "react";
import { StoreProductCategory } from "@medusajs/types";
import Link from "next/link";
import { hasChildrenCategory } from "@lib/util/categories";
import Thumbnail from "@modules/products/components/thumbnail";
import { PopoverBackdrop } from "@headlessui/react";

const CategoryMenuContent = ({ category }: Props) => {
  return (
    <div>
      <PopoverBackdrop
        transition
        className="data-closed:opacity-0 fixed inset-0 bg-black/30 transition duration-200 ease-out"
      />
      <div className="relative z-10 w-screen bg-background-primary text-ui-fg-on-color">
        <ul className="content-container flex list-none gap-8 py-8">
          {category.category_children.map((subCategory) => (
            <li key={subCategory.id}>
              <Link
                className="flex flex-col gap-2 font-normal"
                href={`/categories/${subCategory.handle}`}
              >
                <Thumbnail
                  thumbnail={subCategory.metadata?.thumbnail as string}
                  size="square"
                  className="rounded-md object-cover sm:h-40 sm:w-40"
                />
                {subCategory.name}
              </Link>
              {hasChildrenCategory(subCategory) ? (
                <div className="flex flex-col gap-2">
                  {subCategory.category_children.map((children) => (
                    <Link
                      key={children.id}
                      href={`/categories/${children.handle}`}
                      className="text-sm"
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
    </div>
  );
};

type Props = {
  category: StoreProductCategory;
};

export default CategoryMenuContent;
