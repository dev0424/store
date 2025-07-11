import React from "react";
import Thumbnail from "@modules/products/components/thumbnail";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { StoreProductCategory } from "@medusajs/types";

type Props = {
  category: StoreProductCategory;
};

const CategoryPreview = ({ category }: Props) => {
  return (
    <LocalizedClientLink
      href={`/categories/${category.handle}`}
      className={"group flex flex-col gap-4"}
    >
      <Thumbnail
        thumbnail={category.metadata?.thumbnail as string}
        size={"square"}
        className={"h-40 !rounded-full sm:h-52"}
      />
      <p className={"text-center text-lg font-black text-ui-fg-base"}>
        {category.name}
      </p>
    </LocalizedClientLink>
  );
};

export default CategoryPreview;
