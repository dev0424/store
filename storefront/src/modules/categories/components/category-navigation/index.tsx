import React from "react";
import { listCategories } from "@lib/data/categories";
import { NavigationMenu } from "radix-ui";
import {
  filterMainCategories,
  hasChildrenCategory,
} from "@lib/util/categories";
import CategoryMenu from "@modules/categories/components/category-menu";
import CategoryMenuContent from "@modules/categories/components/category-menu-content";
import Link from "next/link";

const CategoryNavigation = async () => {
  const product_categories = await listCategories();
  const categories = filterMainCategories(product_categories);

  return (
    <NavigationMenu.Root className="relative z-10 flex w-screen justify-center">
      <NavigationMenu.List className="center m-0 flex list-none p-1">
        {categories.map((category) => (
          <NavigationMenu.Item key={category.id}>
            {hasChildrenCategory(category) ? (
              <>
                <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-1 px-3 py-2 font-medium leading-none text-black outline-none">
                  <CategoryMenu category={category} />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute left-0 top-0 w-full bg-white p-4 text-black data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft sm:w-auto">
                  <CategoryMenuContent category={category} />
                </NavigationMenu.Content>
              </>
            ) : (
              <Link
                className="block select-none rounded px-3 py-2 font-medium leading-none text-black no-underline outline-none"
                href={`/categories/${category.handle}`}
              >
                {category.name}
              </Link>
            )}
          </NavigationMenu.Item>
        ))}

        <NavigationMenu.Indicator className="top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
          <div className="relative top-[70%] size-2.5 rotate-45 rounded-tl-sm bg-white" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
        <NavigationMenu.Viewport className="relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md bg-white transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

export default CategoryNavigation;
