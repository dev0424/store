"use client";

import React from "react";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiOutlineX } from "react-icons/hi";
import RefinementList from "@modules/store/components/refinement-list";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import { HttpTypes } from "@medusajs/types";

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
  sortBy: SortOptions;
  category: HttpTypes.StoreProductCategory;
  minPrice?: string;
  maxPrice?: string;
};

const RefinementListPopover = ({
  isOpen,
  onClose,
  sortBy,
  category,
  minPrice,
  maxPrice,
}: Props) => {
  return (
    <Transition
      show={isOpen}
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
            onClick={onClose}
            className="absolute right-6 top-6 cursor-pointer"
          />
          <RefinementList
            sortBy={sortBy}
            data-testid="sort-by-container"
            category={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>
      </div>
    </Transition>
  );
};

export default RefinementListPopover;
