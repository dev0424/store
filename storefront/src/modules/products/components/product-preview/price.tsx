import { clx } from "@medusajs/ui";

type ExtendedVariantPrice = {
  calculated_price_number: number;
  calculated_price: string;
  original_price_number: number | null;
  original_price: string;
  currency_code: string | null;
  price_type: string | null;
  percentage_diff: string;
  is_tax_inclusive: boolean | undefined;
};

export default async function PreviewPrice({
  price,
}: {
  price: ExtendedVariantPrice;
}) {
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
      {price.is_tax_inclusive ? null : <span className="text-xs">HT</span>}
    </>
  );
}
