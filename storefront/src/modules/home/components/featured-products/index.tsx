import { HttpTypes } from "@medusajs/types";
import ProductCarouselTemplate from "@modules/home/templates/product-carousel-template";

export default function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[];
  region: HttpTypes.StoreRegion;
}) {
  return collections.map((collection) => (
    <li key={collection.id}>
      <ProductCarouselTemplate region={region} collection={collection} />
    </li>
  ));
}
