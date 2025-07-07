"use client";

import React, { ReactNode, useState } from "react";
import { clx } from "@medusajs/ui";
import RefinementList from "@modules/store/components/refinement-list";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import { HttpTypes } from "@medusajs/types";
import FiltersToolbar from "@modules/categories/components/filters-toolbar";
import RefinementListPopover from "@modules/store/components/refinement-list/filters-popover";

type Props = {
  children: ReactNode;
  sortBy: SortOptions;
  categoryId?: string | string[];
  category: HttpTypes.StoreProductCategory;
  minPrice?: string;
  maxPrice?: string;
};

const FilterLayout = ({
  children,
  sortBy,
  category,
  minPrice,
  maxPrice,
}: Props) => {
  const [showFilters, setShowFilters] = useState(true);

  const toggleFilters = () => setShowFilters((prevState) => !prevState);

  return (
    <div className="flex flex-col gap-6">
      <FiltersToolbar onClick={toggleFilters} />
      <RefinementListPopover
        isOpen={showFilters}
        onClose={toggleFilters}
        sortBy={sortBy}
        category={category}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
      <div
        className={clx("grid grid-cols-1", {
          "gap-6 sm:grid-cols-[auto_1fr]": showFilters,
        })}
      >
        <div className="hidden sm:block">
          {showFilters ? (
            <RefinementList
              sortBy={sortBy}
              data-testid="sort-by-container"
              category={category}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
};

export default FilterLayout;
