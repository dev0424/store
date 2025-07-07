"use client";

import CategoryFilter from "@modules/store/components/refinement-list/category-filter";
import { StoreProductCategory } from "@medusajs/types";
import Divider from "@modules/common/components/divider";
import SortProducts, {
  SortOptions,
} from "@modules/store/components/refinement-list/sort-products";
import PriceRange from "@modules/store/components/refinement-list/price-range";

type Props = {
  sortBy: SortOptions;
  search?: boolean;
  "data-testid"?: string;
  category: StoreProductCategory;
  minPrice?: string;
  maxPrice?: string;
};

const RefinementList = ({
  sortBy,
  category,
  minPrice,
  maxPrice,
  "data-testid": dataTestId,
}: Props) => {
  return (
    <div className="flex flex-col gap-8 sm:border-r sm:border-gray-200 sm:pr-8">
      <SortProducts sortBy={sortBy} data-testid={dataTestId} />
      <Divider />
      <CategoryFilter category={category} />
      <Divider />
      <PriceRange minPrice={minPrice} maxPrice={maxPrice} />
    </div>
  );
};

export default RefinementList;
