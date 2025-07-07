import { notFound } from "next/navigation";
import { Suspense } from "react";
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid";
import RefinementList from "@modules/store/components/refinement-list";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import PaginatedProducts from "@modules/store/templates/paginated-products";
import { HttpTypes } from "@medusajs/types";
import CategoryHeader from "@modules/categories/components/category-header";
import FiltersToolbar from "@modules/categories/components/filters-toolbar";
import { clx } from "@medusajs/ui";
import { getShowFiltersCookie } from "@lib/data/filters";

export default async function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
  categoryId,
  minPrice,
  maxPrice,
}: {
  category: HttpTypes.StoreProductCategory;
  sortBy?: SortOptions;
  page?: string;
  countryCode: string;
  categoryId?: string | string[];
  minPrice?: string;
  maxPrice?: string;
}) {
  const pageNumber = page ? parseInt(page) : 1;
  const sort = sortBy || "created_at";
  const showFilters = await getShowFiltersCookie();

  const categoryIds = categoryId
    ? Array.isArray(categoryId)
      ? categoryId
      : [categoryId]
    : [category.id, ...category.category_children.map((c) => c.id)];

  if (!countryCode) {
    notFound();
  }

  return (
    <div
      className="content-container flex flex-col py-6 small:flex-row small:items-start"
      data-testid="category-container"
    >
      <div className="flex w-full flex-col gap-8">
        <CategoryHeader category={category} />
        <FiltersToolbar />
        <div
          className={clx("grid grid-cols-1 gap-8", {
            "sm:grid-cols-[auto_1fr]": showFilters,
          })}
        >
          {showFilters ? (
            <RefinementList
              sortBy={sort}
              data-testid="sort-by-container"
              category={category}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          ) : null}
          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={category.products?.length ?? 8}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryIds={categoryIds}
              countryCode={countryCode}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
