import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import { PRODUCT_LIMIT } from "@lib/constants";

type PaginatedProductsParams = {
  limit: number;
  collection_id?: string[];
  category_id?: string[];
  id?: string[];
  order?: string;
  min_price?: string;
  max_price?: string;
};

export const buildProductsQuery = (
  collectionId?: string,
  categoryIds?: string[],
  productsIds?: string[],
  minPrice?: string,
  maxPrice?: string,
  sortBy?: SortOptions,
) => {
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

  return queryParams;
};
