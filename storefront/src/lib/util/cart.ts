import { StoreCart } from "@medusajs/types";
import { sdk } from "@lib/config";

/**
 * Retrieves the inventory quantity for each product variant in the cart.
 * - Only valid product IDs are sent to the Medusa Store API.
 * - Handles cases where inventory is not tracked (manage_inventory: false).
 * - Returns "Infinity" for variants where inventory is not managed, or the available quantity (0 if undefined).
 * - Handles API errors gracefully.
 */
export const getCartInventory = async (cart: StoreCart | null) => {
  // Extract product IDs from cart items, filtering out any undefined/null values.
  const cartProductIds = (cart?.items || [])
    .map((item) => item.product?.id)
    .filter((id): id is string => Boolean(id)); // Keep only valid (truthy) IDs.

  try {
    // Fetch product data from the Medusa Store API, requesting calculated price and inventory quantity for variants.
    const products = await sdk.store.product.list({
      id: cartProductIds,
      fields: "*variants.calculated_price,+variants.inventory_quantity",
    });

    // Flatten all variants from all products and build a mapping of variant ID to inventory info.
    return products.products
      .flatMap((product) => product.variants || [])
      .reduce((acc: Record<string, number>, variant) => {
        if (variant.manage_inventory === false) {
          // If inventory is not managed, mark as "Infinity" (always in stock).
          acc[variant.id] = Infinity;
        } else {
          // Otherwise, set to the available inventory quantity, or 0 if undefined.
          // If the variant has no inventory in the relevant stock location, inventory_quantity will be undefined.
          acc[variant.id] = variant.inventory_quantity ?? 0;
        }
        return acc;
      }, {});
  } catch (error) {
    console.error(error);
    // If the API call fails, return an empty object (no inventory info).
    return {};
  }
};
