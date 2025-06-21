import React from "react";
import { ImageOrPlaceholder } from "@modules/products/components/thumbnail";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { StoreCollection } from "@medusajs/types";

type Props = {
  collection: StoreCollection;
  index: number;
};

const CollectionPreview = ({ collection, index }: Props) => {
  return (
    <LocalizedClientLink
      href={`/collections/${collection.handle}`}
      className={`flex flex-col gap-2 overflow-hidden ${index === 0 ? "row-span-2" : ""}`}
    >
      <div
        className={"relative aspect-[4/3] h-full overflow-hidden rounded-md"}
      >
        <ImageOrPlaceholder image={collection.metadata?.thumbnail as string} />
      </div>
      <p className={"text-lg font-black"}>{collection.title}</p>
    </LocalizedClientLink>
  );
};

export default CollectionPreview;
