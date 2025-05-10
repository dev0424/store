import { Suspense } from "react";
import { listRegions } from "@lib/data/regions";
import { StoreRegion } from "@medusajs/types";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CartButton from "@modules/layout/components/cart-button";
import SideMenu from "@modules/layout/components/side-menu";
import CategoryNavigation from "@modules/categories/components/category-navigation";
import SearchHeader from "@modules/search/templates/search-header";
import {
  HiOutlineUser as UserIcon,
  HiOutlineShoppingCart as ShoppingCartIcon,
} from "react-icons/hi";

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions);

  return (
    <div className="group sticky inset-x-0 top-0 z-50 text-white">
      <header className="relative mx-auto flex flex-col gap-4 border-b border-ui-border-base bg-white p-4 duration-200">
        <nav className="text-small-regular txt-xsmall-plus flex h-full w-full flex-wrap items-center justify-between gap-4 text-ui-fg-subtle sm:flex-nowrap">
          <div className="flex h-full flex-1 basis-0 items-center sm:hidden">
            <SideMenu regions={regions} />
          </div>

          <div className="flex h-full items-center">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus uppercase hover:text-ui-fg-base"
              data-testid="nav-store-link"
            >
              Store
            </LocalizedClientLink>
          </div>

          <div className="order-1 flex h-[42px] w-full justify-center sm:order-none">
            <div className="w-full sm:w-1/2">
              <SearchHeader />
            </div>
          </div>

          <div className="flex h-full flex-1 basis-0 items-center justify-end gap-x-6">
            <div className="flex h-full items-center gap-x-6">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                <UserIcon size={24} />
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex whitespace-nowrap hover:text-ui-fg-base"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <ShoppingCartIcon size={24} />
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
        <div className={"hidden gap-6 sm:flex sm:items-center"}>
          <CategoryNavigation />
          <LocalizedClientLink className="text-black" href="#">
            Help
          </LocalizedClientLink>
          <LocalizedClientLink className="text-black" href="#">
            Contact
          </LocalizedClientLink>
        </div>
      </header>
    </div>
  );
}
