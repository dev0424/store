"use client";

import React, { ReactNode } from "react";
import { clx } from "@medusajs/ui";
import RefinementList from "@modules/store/components/refinement-list";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import { HttpTypes } from "@medusajs/types";
import FiltersToolbar from "@modules/categories/components/filters-toolbar";
import useToggleState from "@lib/hooks/use-toggle-state";

type Props = {
  children: ReactNode;
  sortBy: SortOptions;
  categories: HttpTypes.StoreProductCategory[];
  minPrice?: string;
  maxPrice?: string;
};

const FilterLayout = ({
  children,
  sortBy,
  categories,
  minPrice,
  maxPrice,
}: Props) => {
  const { state: showFilters, toggle: toggleFilters } = useToggleState(true);

  return (
    <div className="flex flex-col gap-6">
      <FiltersToolbar
        onClick={toggleFilters}
        sortBy={sortBy}
        categories={categories}
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
              categories={categories}
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
