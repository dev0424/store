"use client";

import React, { Fragment, useState, useRef } from "react";
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

const OPEN_DELAY = 200;
const CLOSE_DELAY = 250;

const CategoryMenuItem = ({ category }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const openTimer = useRef<NodeJS.Timeout | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const openMenu = () => setIsOpen(true);

  const closeMenu = () => setIsOpen(false);

  const handleMouseEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    openTimer.current = setTimeout(openMenu, OPEN_DELAY);
  };

  const handleMouseLeave = () => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
    }
    closeTimer.current = setTimeout(closeMenu, CLOSE_DELAY);
  };

  return (
    <Popover
      className="mr-6 flex h-full"
      // @ts-expect-error HeadlessUI Popover types don't yet expose controlled props
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        <PopoverButton as="button" className="text-white outline-none">
          <CategoryMenu
            category={category}
            isOpen={isOpen}
            onClick={closeMenu}
          />
        </PopoverButton>
        {hasChildrenCategory(category) && (
          <Transition
            show={isOpen}
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
              <CategoryMenuContent category={category} onClick={closeMenu} />
            </PopoverPanel>
          </Transition>
        )}
      </div>
    </Popover>
  );
};

export default CategoryMenuItem;
