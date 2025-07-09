"use client";

import React from "react";
import RefinementListPopover from "@modules/store/components/refinement-list/filters-popover";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import { HttpTypes } from "@medusajs/types";
import FilterButton from "@modules/store/components/refinement-list/filter-button";

type Props = {
  onClick: VoidFunction;
  sortBy: SortOptions;
  category: HttpTypes.StoreProductCategory;
  minPrice?: string;
  maxPrice?: string;
};

const FiltersToolbar = ({
  onClick,
  category,
  sortBy,
  minPrice,
  maxPrice,
}: Props) => {
  return (
    <div className="border-y border-y-gray-200 py-4">
      <FilterButton onClick={onClick} className="hidden sm:block" />
      <RefinementListPopover
        sortBy={sortBy}
        category={category}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </div>
  );
};

export default FiltersToolbar;
