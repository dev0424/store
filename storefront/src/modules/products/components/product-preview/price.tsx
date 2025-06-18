import { clx } from "@medusajs/ui";
import { VariantPrice } from "types/global";

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null;
  }

  return (
    <>
      {price.price_type === "sale" && (
        <p className="text-black line-through" data-testid="original-price">
          {price.original_price}
        </p>
      )}
      <p
        className={clx("text-lg font-bold text-black", {
          "text-ui-fg-interactive": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </p>
    </>
  );
}
