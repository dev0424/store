import React from "react";
import { listProducts } from "@lib/data/products";
import { HttpTypes } from "@medusajs/types";
import Carousel from "@modules/common/components/carousel";
import InteractiveLink from "@modules/common/components/interactive-link";
import ProductPreview from "@modules/products/components/product-preview";

type Props = {
  collection: HttpTypes.StoreCollection;
  region: HttpTypes.StoreRegion;
};

export default async function ProductCarouselTemplate({
  collection,
  region,
}: Props) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  });

  if (!pricedProducts) {
    return null;
  }

  const productPreviews = pricedProducts.map((product) => (
    <ProductPreview
      key={product.id}
      product={product}
      region={region}
      isFeatured={false}
      size={"square"}
    />
  ));

  return (
    <section className="flex flex-col gap-4 py-4">
      <div>
        <div className="flex flex-row items-center justify-between px-6">
          <h1 className="text-xl-semi text-ui-fg-base">{collection.title}</h1>
          <InteractiveLink href={`/collections/${collection.handle}`}>
            Voir tout
          </InteractiveLink>
        </div>
        <p className="px-6 text-ui-fg-subtle">
          {collection?.metadata?.description as string}
        </p>
      </div>
      <Carousel>{productPreviews}</Carousel>
    </section>
  );
}
