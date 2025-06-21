import React from "react";
import { StoreCollection } from "@medusajs/types";
import CollectionPreview from "@modules/home/components/collection-preview";

type Props = {
  collections: StoreCollection[];
};

const FeaturedCollections = ({ collections }: Props) => {
  const featuredCollections = collections
    .filter((c) => c.handle !== "featured-products")
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(0, 5);

  if (!collections.length) {
    return null;
  }

  return (
    <div className={"grid grid-cols-1 gap-4 sm:grid-cols-3"}>
      {featuredCollections.map((collection, index) => (
        <CollectionPreview
          key={collection.id}
          collection={collection}
          index={index}
        />
      ))}
    </div>
  );
};

export default FeaturedCollections;
