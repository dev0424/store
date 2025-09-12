import React from "react";
import { StoreProductCategory } from "@medusajs/types";

type Props = {
  category: StoreProductCategory;
};

const CategoryHeader = ({ category }: Props) => {
  return (
    <div className="grid grid-cols-1 items-center overflow-hidden rounded-md bg-background-secondary text-white sm:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 sm:p-16">
        <div className="flex flex-col items-baseline sm:flex-row sm:gap-2">
          <h1 className="text-xl-semi">{category.name}</h1>
          <span className="text-lg font-normal text-[#9FA2A5]">
            ({category.products?.length} products)
          </span>
        </div>
        {category.description ? (
          <div>
            <p className="text-sm leading-6 sm:text-base">
              {category.description}
            </p>
          </div>
        ) : null}
      </div>
      {category.metadata?.thumbnail ? (
        <div className="flex w-full items-center justify-center">
          <img
            src={category.metadata?.thumbnail as string}
            alt={category.name}
            className="h-40 rounded-none contain-content sm:h-64"
          />
        </div>
      ) : null}
    </div>
  );
};

export default CategoryHeader;
