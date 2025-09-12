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
      className={`relative overflow-hidden rounded-md ${index === 0 ? "row-span-2" : ""}`}
    >
      <div className={"relative aspect-[4/3] h-full"}>
        <ImageOrPlaceholder image={collection.metadata?.thumbnail as string} />
      </div>
      <div
        className={
          "absolute bottom-0 left-0 flex h-1/2 w-full flex-col justify-end bg-gradient-to-b from-transparent to-background-primary p-4"
        }
      >
        <div className={"flex items-center justify-between"}>
          <div>
            <p className={"text-xl font-black text-white"}>
              {collection.title}
            </p>
            {collection.metadata?.description ? (
              <p className={"text-md font-light text-white"}>
                {collection.metadata?.description as string}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  );
};

export default CollectionPreview;
