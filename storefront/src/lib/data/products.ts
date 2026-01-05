"use server";

import { sdk } from "@lib/config";
import {
  FindParams,
  StoreProductParams,
  StoreProduct,
  StoreRegion,
} from "@medusajs/types";
import { getAuthHeaders, getCacheOptions } from "./cookies";
import { getRegion, retrieveRegion } from "./regions";
import { ProductPriceRange } from "@types/product";
import { PRODUCT_LIMIT } from "@lib/constants";

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number;
  queryParams?: FindParams & StoreProductParams;
  countryCode?: string;
  regionId?: string;
}): Promise<{
  response: { products: StoreProduct[]; count: number };
  nextPage: number | null;
  queryParams?: FindParams & StoreProductParams;
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required");
  }

  const limit = queryParams?.limit || PRODUCT_LIMIT;
  const _pageParam = Math.max(pageParam, 1);
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

  let region: StoreRegion | undefined | null;

  if (countryCode) {
    region = await getRegion(countryCode);
  } else {
    region = await retrieveRegion(regionId!);
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    };
  }

  const headers = {
    ...(await getAuthHeaders()),
  };

  const next = {
    ...(await getCacheOptions("products")),
  };

  return sdk.client
    .fetch<{ products: StoreProduct[]; count: number }>(`/store/products`, {
      method: "GET",
      query: {
        limit,
        offset,
        region_id: region?.id,
        fields:
          "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags,+documents.*",
        ...queryParams,
      },
      headers,
      next,
      cache: "force-cache",
    })
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null;

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      };
    });
};

/**
 * This will fetch 12 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  countryCode,
}: {
  page?: number;
  queryParams?: FindParams & StoreProductParams;
  countryCode: string;
}): Promise<{
  response: { products: StoreProduct[]; count: number };
  nextPage: number | null;
  queryParams?: FindParams & StoreProductParams;
}> => {
  const limit = queryParams?.limit || PRODUCT_LIMIT;

  const {
    response: { products, count },
  } = await listProducts({
    pageParam: page,
    queryParams: {
      ...queryParams,
      limit,
    },
    countryCode,
  });

  const pageParam = (page - 1) * limit;
  const nextPage = count > pageParam + limit ? pageParam + limit : null;

  return {
    response: {
      products,
      count,
    },
    nextPage,
    queryParams,
  };
};

export const getProductsPriceRange = async (
  categoryIds: string[],
): Promise<ProductPriceRange> => {
  return sdk.client.fetch(`/store/products/price-range`, {
    query: {
      category_ids: categoryIds,
    },
  });
};
