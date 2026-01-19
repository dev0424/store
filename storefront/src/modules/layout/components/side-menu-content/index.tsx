import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import CategoriesPanel from "@modules/layout/components/categories-panel";
import ForwardButton from "@modules/layout/components/forward-button";
import Divider from "@modules/common/components/divider";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { StoreProductCategory } from "@medusajs/types";
import { View } from "@modules/layout/components/side-menu";

type Props = {
  currentCategory: StoreProductCategory | null;
  view: View;
  onNavigateForward: (category: StoreProductCategory) => void;
  onNavigateBackward: VoidFunction;
  rootCategories: StoreProductCategory[];
  openProductsRoot: VoidFunction;
  onClickMenuItem: VoidFunction;
};

const SideMenuContent = ({
  currentCategory,
  view,
  onNavigateForward,
  onNavigateBackward,
  rootCategories,
  openProductsRoot,
  onClickMenuItem,
}: Props) => {
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={currentCategory?.id || "root"}
        initial={{
          x: view.direction === "forward" ? "100%" : "-100%",
          opacity: 0,
        }}
        animate={{ x: 0, opacity: 1 }}
        exit={{
          x: view.direction === "forward" ? "-100%" : "100%",
          opacity: 0,
        }}
        transition={{ duration: 0.25 }}
        className="flex h-full flex-col"
      >
        {currentCategory ? (
          <CategoriesPanel
            currentCategory={currentCategory}
            onNavigateForward={onNavigateForward}
            onNavigateBackward={onNavigateBackward}
            onClick={onClickMenuItem}
            rootCategories={rootCategories}
          />
        ) : (
          <div className="flex flex-col gap-2">
            <ForwardButton title="Products" onClick={openProductsRoot} />
            <Divider className="my-1 border-background-secondary" />
            <LocalizedClientLink
              href="/register"
              className="text-lg leading-10 hover:text-accent-primary"
              onClick={onClickMenuItem}
            >
              Créer un compte
            </LocalizedClientLink>
            <Divider className="my-1 border-background-secondary" />
            <LocalizedClientLink
              href="#"
              className="text-lg leading-10 hover:text-accent-primary"
              onClick={onClickMenuItem}
            >
              Catalogue
            </LocalizedClientLink>
            <Divider className="my-1 border-background-secondary" />
            <LocalizedClientLink
              href="/distributors"
              className="text-lg leading-10 hover:text-accent-primary"
              onClick={onClickMenuItem}
            >
              Trouver un distributeur
            </LocalizedClientLink>
            <Divider className="my-1 border-background-secondary" />
            <LocalizedClientLink
              href="/about"
              className="text-lg leading-10 hover:text-accent-primary"
              onClick={onClickMenuItem}
            >
              À propos
            </LocalizedClientLink>
            <Divider className="my-1 border-background-secondary" />
            <LocalizedClientLink
              href="/contact"
              className="text-lg leading-10 hover:text-accent-primary"
              onClick={onClickMenuItem}
            >
              Contact
            </LocalizedClientLink>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SideMenuContent;
