import { StoreCollection, StoreRegion } from "@medusajs/types";
import ProductCarouselTemplate from "@modules/home/templates/product-carousel-template";

type Props = {
  collections: StoreCollection[];
  region: StoreRegion;
};

export default async function FeaturedProducts({ collections, region }: Props) {
  const collection = collections.find((c) => c.handle === "featured-products");

  if (!collection) {
    return null;
  }

  return <ProductCarouselTemplate region={region} collection={collection} />;
}
