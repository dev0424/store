import { getProductPrice } from "@lib/util/get-product-price";
import { StoreProduct, StoreRegion } from "@medusajs/types";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "../thumbnail";
import PreviewPrice from "./price";

export default async function ProductPreview({
  product,
  isFeatured,
  region,
  size = "full",
}: {
  product: StoreProduct;
  isFeatured?: boolean;
  region: StoreRegion;
  size?: "small" | "full" | "medium" | "large" | "square" | undefined;
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  });

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size={size}
          isFeatured={isFeatured}
          className={"h-40 sm:h-60"}
        />
        <div className="mt-4 flex flex-col items-start">
          <p className="text-md text-ui-fg-subtle" data-testid="product-title">
            {product.title}
          </p>
          <div className="flex gap-x-1">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  );
}
