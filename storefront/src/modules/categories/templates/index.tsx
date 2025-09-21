import { notFound } from "next/navigation";
import { Suspense } from "react";
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import PaginatedProducts from "@modules/store/templates/paginated-products";
import { HttpTypes } from "@medusajs/types";
import CategoryHeader from "@modules/categories/components/category-header";
import FilterLayout from "@modules/categories/templates/filter-layout";

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
      <div className="flex w-full flex-col gap-6">
        <CategoryHeader
          name={category.name}
          description={category.description}
          thumbnail={category.metadata?.thumbnail as string}
        />
        <FilterLayout
          categories={category.category_children}
          sortBy={sort}
          minPrice={minPrice}
          maxPrice={maxPrice}
        >
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
        </FilterLayout>
      </div>
    </div>
  );
}
