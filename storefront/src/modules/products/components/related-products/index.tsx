import { listProducts } from "@lib/data/products";
import { getRegion } from "@lib/data/regions";
import { HttpTypes } from "@medusajs/types";
import ProductPreview from "../product-preview";

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct;
  countryCode: string;
};

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode);

  if (!region) {
    return null;
  }

  // edit this function to define your related products logic
  const queryParams: HttpTypes.StoreProductParams = {};
  if (region?.id) {
    queryParams.region_id = region.id;
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id];
  }
  if (product.tags) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[];
  }
  queryParams.is_giftcard = false;

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id,
    );
  });

  if (!products.length) {
    return null;
  }

  return (
    <div className="product-page-constraint">
      <div className="mb-16 flex flex-col items-center text-center">
        <span className="text-medium text-ui-fg-muted">Related products</span>
        <p className="text-2xl-regular max-w-lg text-ui-fg-base">
          Products picked for you
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-x-6 gap-y-8 small:grid-cols-4 medium:grid-cols-5">
        {products.map((product) => (
          <li key={product.id}>
            <ProductPreview region={region} product={product} size={"square"} />
          </li>
        ))}
      </ul>
    </div>
  );
}
