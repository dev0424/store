"use client";

import React, { Fragment, useRef } from "react";
import {
  Popover,
  PopoverPanel,
  Transition,
  PopoverButton,
} from "@headlessui/react";
import { StoreProductCategory } from "@medusajs/types";
import { hasChildrenCategory } from "@lib/util/categories";
import CategoryMenuContent from "@modules/categories/components/category-menu-content";
import CategoryMenu from "@modules/categories/components/category-menu";

type Props = {
  category: StoreProductCategory;
};

const CategoryMenuItem = ({ category }: Props) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const onMouseEnter = (isOpen: boolean) => {
    if (isOpen) {
      return;
    }
    triggerRef.current?.click();
  };

  const onMouseLeave = (isOpen: boolean) => {
    if (isOpen) {
      triggerRef.current?.click();
    }
  };

  return (
    <Popover className="mr-6 flex h-full">
      {({ open }) => (
        <div
          onMouseEnter={() => onMouseEnter(open)}
          onMouseLeave={() => onMouseLeave(open)}
        >
          <PopoverButton ref={triggerRef} className="text-white outline-none">
            <CategoryMenu category={category} isOpen={open} />
          </PopoverButton>
          {hasChildrenCategory(category) ? (
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <PopoverPanel
                anchor={{ to: "bottom" }}
                className="z-40 !overflow-hidden"
              >
                <CategoryMenuContent category={category} />
              </PopoverPanel>
            </Transition>
          ) : null}
        </div>
      )}
    </Popover>
  );
};

export default CategoryMenuItem;
