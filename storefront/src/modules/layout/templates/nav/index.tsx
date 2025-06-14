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
import Image from "next/image";

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions);

  return (
    <div className="group sticky inset-x-0 top-0 z-50 bg-header text-white">
      <header className="relative mx-auto flex max-w-[1440px] flex-col gap-4 p-4 duration-200">
        <nav className="text-small-regular txt-xsmall-plus flex h-full w-full flex-wrap items-center justify-between gap-4 text-ui-fg-subtle sm:flex-nowrap">
          <div className="flex h-full flex-1 basis-0 items-center sm:hidden">
            <SideMenu regions={regions} />
          </div>

          <LocalizedClientLink href="/" data-testid="nav-store-link">
            <Image
              src={"/images/logo.png"}
              width={200}
              height={50}
              alt="RSPI logo"
              className={"object-cover"}
            />
          </LocalizedClientLink>

          <div className="order-1 flex h-[42px] w-full justify-center sm:order-none">
            <div className="w-full sm:w-2/3">
              <SearchHeader />
            </div>
          </div>

          <div className="flex h-full flex-1 basis-0 items-center justify-end gap-x-6">
            <div className="flex h-full items-center gap-x-6">
              <LocalizedClientLink
                className="text-white"
                href="/account"
                data-testid="nav-account-link"
              >
                <UserIcon size={24} />
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex whitespace-nowrap text-white"
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
        <div className={"hidden justify-between gap-6 sm:flex sm:items-center"}>
          <CategoryNavigation />
          <div className={"flex gap-6"}>
            <LocalizedClientLink className="text-white" href="#">
              Help
            </LocalizedClientLink>
            <LocalizedClientLink className="text-white" href="#">
              Contact
            </LocalizedClientLink>
          </div>
        </div>
      </header>
    </div>
  );
}
