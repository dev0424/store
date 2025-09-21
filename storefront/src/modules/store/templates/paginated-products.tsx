import { listProductsWithSort } from "@lib/data/products";
import { getRegion } from "@lib/data/regions";
import ProductPreview from "@modules/products/components/product-preview";
import { Pagination } from "@modules/store/components/pagination";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import NoResult from "../components/no-result";

const PRODUCT_LIMIT = 12;

type PaginatedProductsParams = {
  limit: number;
  collection_id?: string[];
  category_id?: string[];
  id?: string[];
  order?: string;
  min_price?: string;
  max_price?: string;
};

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryIds,
  productsIds,
  countryCode,
  minPrice,
  maxPrice,
}: {
  sortBy?: SortOptions;
  page: number;
  collectionId?: string;
  categoryIds?: string[];
  productsIds?: string[];
  countryCode: string;
  minPrice?: string;
  maxPrice?: string;
}) {
  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  };

  if (collectionId) {
    queryParams["collection_id"] = [collectionId];
  }

  if (categoryIds) {
    queryParams["category_id"] = categoryIds;
  }

  if (productsIds) {
    queryParams["id"] = productsIds;
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at";
  }

  if (minPrice) {
    queryParams["min_price"] = minPrice;
  }

  if (maxPrice) {
    queryParams["max_price"] = maxPrice;
  }

  const region = await getRegion(countryCode);

  if (!region) {
    return null;
  }

  let {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    countryCode,
  });

  const totalPages = Math.ceil(count / PRODUCT_LIMIT);

  return (
    <section className="flex flex-col justify-between">
      {products.length ? (
        <ul
          className="grid w-full grid-cols-2 gap-x-6 gap-y-8 small:grid-cols-3 medium:grid-cols-4"
          data-testid="products-list"
        >
          {products.map((p) => {
            return (
              <li key={p.id}>
                <ProductPreview product={p} region={region} />
              </li>
            );
          })}
        </ul>
      ) : (
        <NoResult />
      )}
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </section>
  );
}
