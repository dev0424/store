"use client";

import CategoryFilter from "@modules/store/components/refinement-list/category-filter";
import { StoreProductCategory } from "@medusajs/types";
import Divider from "@modules/common/components/divider";
import SortProducts, {
  SortOptions,
} from "@modules/store/components/refinement-list/sort-products";
import PriceRange from "@modules/store/components/refinement-list/price-range";
import { ProductPriceRange } from "@types/product";

type Props = {
  sortBy: SortOptions;
  search?: boolean;
  "data-testid"?: string;
  categories: StoreProductCategory[];
  minPrice?: string;
  maxPrice?: string;
  priceRange: ProductPriceRange;
};

const RefinementList = ({
  sortBy,
  categories,
  minPrice,
  maxPrice,
  priceRange,
  "data-testid": dataTestId,
}: Props) => {
  return (
    <div className="flex h-full flex-col gap-6 sm:border-r sm:border-gray-200 sm:pr-8">
      <SortProducts sortBy={sortBy} data-testid={dataTestId} />
      <Divider />
      {categories.length ? (
        <>
          <CategoryFilter categories={categories} />
          {/*<Divider />*/}
        </>
      ) : null}
      {/* Disable price range filter until Medusa doesn't support it*/}
      {/*<PriceRange*/}
      {/*  minPrice={minPrice}*/}
      {/*  maxPrice={maxPrice}*/}
      {/*  priceRange={priceRange}*/}
      {/*/>*/}
    </div>
  );
};

export default RefinementList;
