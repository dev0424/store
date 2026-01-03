import { listProductsWithSort } from "@lib/data/products";
import { getRegion } from "@lib/data/regions";
import ProductPreview from "@modules/products/components/product-preview";
import { Pagination } from "@modules/store/components/pagination";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import NoResult from "../components/no-result";
import { buildProductsQuery } from "@lib/util/query";
import { PRODUCT_LIMIT } from "@lib/constants";

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
  const queryParams = buildProductsQuery(
    collectionId,
    categoryIds,
    productsIds,
    minPrice,
    maxPrice,
    sortBy,
  );

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
