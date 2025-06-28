"use client";

import { Popover, PopoverPanel, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { StoreProductCategory } from "@medusajs/types";
import { filterMainCategories } from "@lib/util/categories";
import SideMenuFooter from "@modules/layout/components/side-menu-footer";
import MenuToggleButton from "@modules/layout/components/menu-toggle-button";
import SideMenuContent from "@modules/layout/components/side-menu-content";

const HEADER_HEIGHT = 114;

type Props = {
  defaultCategories: StoreProductCategory[];
};

export type View = {
  categoryStack: StoreProductCategory[];
  direction: "forward" | "backward";
};

const SideMenu = ({ defaultCategories }: Props) => {
  const rootCategories = filterMainCategories(defaultCategories);

  const [view, setView] = useState<View>({
    categoryStack: [],
    direction: "forward",
  });

  const currentCategory =
    view.categoryStack.length > 0
      ? view.categoryStack[view.categoryStack.length - 1]
      : null;

  const onNavigateForward = (category: StoreProductCategory) => {
    setView((prevState) => ({
      direction: "forward",
      categoryStack: [...prevState.categoryStack, category],
    }));
  };

  const onNavigateBackward = () => {
    setView((prevState) => ({
      direction: "backward",
      categoryStack: prevState.categoryStack.slice(0, -1),
    }));
  };

  const openProductsRoot = () => {
    setView({
      direction: "forward",
      categoryStack: [
        {
          id: "products",
          name: "Products",
          category_children: rootCategories,
        } as StoreProductCategory,
      ],
    });
  };

  const resetMenu = () => {
    setView({
      direction: "backward",
      categoryStack: [],
    });
  };

  return (
    <Popover className="flex h-full font-sans">
      {({ open, close }) => (
        <>
          <MenuToggleButton isOpen={open} onClose={resetMenu} />
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100 backdrop-blur-2xl"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 backdrop-blur-2xl"
            leaveTo="opacity-0"
          >
            <PopoverPanel
              className={`absolute left-0 top-[${HEADER_HEIGHT}px] z-50 flex h-[calc(100vh-${HEADER_HEIGHT}px)] w-full flex-col text-sm text-ui-fg-on-color`}
            >
              <div
                data-testid="nav-menu-popup"
                className="flex h-full flex-col justify-between bg-background-primary p-6"
              >
                <SideMenuContent
                  rootCategories={rootCategories}
                  onClickMenuItem={() => {
                    close();
                    resetMenu();
                  }}
                  onNavigateBackward={onNavigateBackward}
                  onNavigateForward={onNavigateForward}
                  view={view}
                  currentCategory={currentCategory}
                  openProductsRoot={openProductsRoot}
                />
                <SideMenuFooter />
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default SideMenu;
