"use client";

import React from "react";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiOutlineX } from "react-icons/hi";
import RefinementList from "@modules/store/components/refinement-list";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import { HttpTypes } from "@medusajs/types";
import useToggleState from "@lib/hooks/use-toggle-state";
import { Button } from "@medusajs/ui";
import FilterButton from "@modules/store/components/refinement-list/filter-button";
import { ProductPriceRange } from "@types/product";

type Props = {
  sortBy: SortOptions;
  categories: HttpTypes.StoreProductCategory[];
  minPrice?: string;
  maxPrice?: string;
  priceRange: ProductPriceRange;
};

const RefinementListPopover = ({
  sortBy,
  categories,
  minPrice,
  maxPrice,
  priceRange,
}: Props) => {
  const { state: showFilters, toggle: toggleFilters } = useToggleState(false);

  return (
    <>
      <FilterButton onClick={toggleFilters} className="block sm:hidden" />
      <Transition
        show={showFilters}
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100 backdrop-blur-2xl"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 backdrop-blur-2xl"
        leaveTo="opacity-0"
      >
        <div className="fixed left-0 top-[114px] z-50 flex h-[calc(100vh-114px)] w-full flex-col text-sm text-ui-fg-base sm:hidden">
          <div className="flex h-full flex-col justify-between bg-white p-6">
            <HiOutlineX
              size={24}
              onClick={toggleFilters}
              className="absolute right-6 top-6 cursor-pointer"
            />
            <RefinementList
              sortBy={sortBy}
              data-testid="sort-by-container"
              categories={categories}
              minPrice={minPrice}
              maxPrice={maxPrice}
              priceRange={priceRange}
            />
            <Button
              className="h-10 w-full font-sans font-bold tracking-wide"
              onClick={toggleFilters}
            >
              Search
            </Button>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default RefinementListPopover;
