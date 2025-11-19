import { listProducts } from "@lib/data/products";
import { HttpTypes } from "@medusajs/types";
import ProductActions from "@modules/products/components/product-actions";
import { retrieveCustomer } from "@lib/data/customer";

/**
 * Fetches real time pricing for a product and renders the product actions component.
 */
export default async function ProductActionsWrapper({
  id,
  region,
}: {
  id: string;
  region: HttpTypes.StoreRegion;
}) {
  const product = await listProducts({
    queryParams: { id: [id] },
    regionId: region.id,
  }).then(({ response }) => response.products[0]);
  const customer = await retrieveCustomer();

  return (
    <ProductActions
      product={product}
      region={region}
      isLoggedIn={!!customer}
      isApproved={customer?.account_status.application_status === "APPROVED"}
      isLoading={!product}
    />
  );
}
