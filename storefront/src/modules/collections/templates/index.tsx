import { Suspense } from "react";

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import PaginatedProducts from "@modules/store/templates/paginated-products";
import { HttpTypes, StoreProductCategory } from "@medusajs/types";
import CategoryHeader from "@modules/categories/components/category-header";
import FilterLayout from "@modules/categories/templates/filter-layout";

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
  categoryId,
  minPrice,
  maxPrice,
}: {
  sortBy?: SortOptions;
  collection: HttpTypes.StoreCollection;
  page?: string;
  countryCode: string;
  categoryId?: string | string[];
  minPrice?: string;
  maxPrice?: string;
}) {
  const pageNumber = page ? parseInt(page) : 1;
  const sort = sortBy || "created_at";

  const categories = collection.products?.flatMap(
    (product) => product.categories,
  ) as StoreProductCategory[];

  const categoryIds = categoryId
    ? Array.isArray(categoryId)
      ? categoryId
      : [categoryId]
    : categories?.map((c) => c?.id);

  return (
    <div className="content-container flex flex-col py-6 small:flex-row small:items-start">
      <div className="flex w-full flex-col gap-6">
        <CategoryHeader
          name={collection.title}
          description={collection.metadata?.description as string}
          thumbnail={collection.metadata?.thumbnail as string}
        />
        <FilterLayout
          categories={categories}
          sortBy={sort}
          minPrice={minPrice}
          maxPrice={maxPrice}
        >
          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={collection.products?.length ?? 8}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryIds={categoryIds}
              collectionId={collection.id}
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
