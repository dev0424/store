import { Suspense } from "react";
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
import { listCategories } from "@lib/data/categories";
import TopNavBar from "@modules/layout/components/top-nav-bar";
import { ExtendedCustomer } from "@types/customer";
import { isCustomerApproved } from "@lib/util/customer";
import NavLink from "@modules/layout/components/nav-link";

type Props = {
  customer: ExtendedCustomer | null;
};

export default async function Header({ customer }: Props) {
  const categories = await listCategories();

  return (
    <>
      <div className="group sticky inset-x-0 top-0 z-50 border-b border-background-secondary bg-background-primary text-white">
        <div className="hidden sm:block">
          <TopNavBar />
        </div>
        <header className="content-container relative mx-auto flex flex-col gap-4 pb-2 pt-4 duration-200">
          <nav className="text-small-regular txt-xsmall-plus flex h-full w-full flex-wrap items-center justify-between gap-4 sm:flex-nowrap">
            <div className="flex h-full flex-1 basis-0 items-center sm:hidden">
              <SideMenu defaultCategories={categories} />
            </div>

            <LocalizedClientLink href="/" data-testid="nav-store-link">
              <Image
                src="/images/logo.png"
                width={200}
                height={50}
                alt="RSPI logo"
                className="max-w-32 object-cover"
              />
            </LocalizedClientLink>

            <div className="order-1 flex h-[42px] w-full justify-center sm:order-none">
              <div className="w-full sm:w-2/3">
                <SearchHeader />
              </div>
            </div>

            <div className="flex h-full flex-1 basis-0 items-center justify-end gap-x-6">
              <div className="flex h-full items-center gap-x-6">
                <NavLink title={<UserIcon size={24} />} href="/account" />
              </div>
              {isCustomerApproved(customer) ? (
                <Suspense
                  fallback={
                    <NavLink
                      title={<ShoppingCartIcon size={24} />}
                      href="/cart"
                    />
                  }
                >
                  <CartButton />
                </Suspense>
              ) : null}
            </div>
          </nav>
          <div className="hidden justify-between gap-6 sm:flex sm:items-center">
            <CategoryNavigation />
          </div>
        </header>
      </div>
    </>
  );
}
