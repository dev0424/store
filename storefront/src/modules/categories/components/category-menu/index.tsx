import React, { Fragment } from "react";
import { StoreProductCategory } from "@medusajs/types";
import { HiChevronDown as ChevronDown } from "react-icons/hi";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { clx } from "@medusajs/ui";
import { hasChildrenCategory } from "@lib/util/categories";
import { Transition } from "@headlessui/react";

type Props = {
  category: StoreProductCategory;
  isOpen: boolean;
};

const CategoryMenu = ({ category, isOpen }: Props) => {
  if (hasChildrenCategory(category)) {
    return (
      <div className="relative flex items-center gap-1">
        <LocalizedClientLink href={`/categories/${category.handle}`}>
          {category.name}
        </LocalizedClientLink>
        <ChevronDown
          className={clx(
            "relative top-px -translate-y-[2px] transition-transform duration-200 ease-in",
            {
              "-rotate-180": !isOpen,
            },
          )}
        />
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
          <div
            className={"absolute -bottom-[9px] left-0 h-0.5 w-full bg-white"}
          />
        </Transition>
      </div>
    );
  }

  return (
    <LocalizedClientLink href={`/categories/${category.handle}`}>
      {category.name}
    </LocalizedClientLink>
  );
};

export default CategoryMenu;
