import { convertToLocale } from "@lib/util/money";
import { StoreOrder } from "@medusajs/types";

type Props = {
  quote: StoreOrder;
};

const QuoteSummary = ({ quote }: Props) => {
  const getAmount = (amount?: number | null) => {
    if (amount === null || typeof amount === "undefined") {
      return;
    }

    return convertToLocale({
      amount,
      currency_code: quote.currency_code,
    });
  };

  const isShippingAdded = !!quote.shipping_methods?.length;

  return (
    <div>
      <h2 className="text-base-semi">Résumé du devis</h2>
      <div className="text-small-regular my-2 text-ui-fg-base">
        <div className="text-base-regular mb-2 flex items-center justify-between text-ui-fg-base">
          <span>Sous-total (hors TVA)</span>
          <span>{getAmount(quote.item_subtotal)}</span>
        </div>
        <div className="flex flex-col gap-y-1">
          {quote.discount_total > 0 && (
            <div className="flex items-center justify-between">
              <span>Réduction</span>
              <span>- {getAmount(quote.discount_total)}</span>
            </div>
          )}
          {quote.gift_card_total > 0 && (
            <div className="flex items-center justify-between">
              <span>Réduction</span>
              <span>- {getAmount(quote.gift_card_total)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>Livraison</span>
            {isShippingAdded ? (
              <span>{getAmount(quote.shipping_subtotal)}</span>
            ) : (
              <span>RSPI calcule actuellement le prix de livraison.</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span>TVA</span>
            <span>{getAmount(quote.tax_total)}</span>
          </div>
        </div>
        <div className="my-4 h-px w-full border-b border-dashed border-gray-200" />
        <div className="text-base-regular mb-2 flex items-center justify-between text-ui-fg-base">
          <span>Total</span>
          <span>{getAmount(quote.total)}</span>
        </div>
      </div>
    </div>
  );
};

export default QuoteSummary;
