"use client";

import React from "react";
import RefinementListPopover from "@modules/store/components/refinement-list/filters-popover";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import { HttpTypes } from "@medusajs/types";
import FilterButton from "@modules/store/components/refinement-list/filter-button";
import { ProductPriceRange } from "@types/product";

type Props = {
  onClick: VoidFunction;
  sortBy: SortOptions;
  categories: HttpTypes.StoreProductCategory[];
  minPrice?: string;
  maxPrice?: string;
  priceRange: ProductPriceRange;
};

const FiltersToolbar = ({
  onClick,
  categories,
  sortBy,
  minPrice,
  maxPrice,
  priceRange,
}: Props) => {
  return (
    <div className="border-y border-y-gray-200 py-4">
      <FilterButton onClick={onClick} className="hidden sm:block" />
      <RefinementListPopover
        sortBy={sortBy}
        categories={categories}
        minPrice={minPrice}
        maxPrice={maxPrice}
        priceRange={priceRange}
      />
    </div>
  );
};

export default FiltersToolbar;
