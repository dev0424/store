import { Heading } from "@medusajs/ui";
import CartTotals from "@modules/common/components/cart-totals";
import Items from "@modules/order/components/items";
import ShippingDetails from "@modules/order/components/shipping-details";
import { StoreOrder } from "@medusajs/types";
import QuoteDetails from "@modules/order/components/quote-details";

type Props = {
  quote: StoreOrder;
};

export default async function QuoteCompletedTemplate({ quote }: Props) {
  return (
    <div className="h-full py-6">
      <div className="content-container flex h-full w-full max-w-4xl flex-col items-center justify-center gap-y-10">
        <div
          className="flex h-full w-full max-w-4xl flex-col gap-4 bg-white py-10"
          data-testid="order-complete-container"
        >
          <Heading
            level="h1"
            className="mb-4 flex flex-col gap-y-3 text-3xl text-ui-fg-base"
          >
            <span>Votre devis a été confirmé avec succès.</span>
          </Heading>
          <QuoteDetails quote={quote} />
          <Heading level="h2" className="text-3xl-regular flex flex-row">
            Résumé
          </Heading>
          <Items order={quote} />
          <CartTotals cart={quote} />
          <ShippingDetails order={quote} />
        </div>
      </div>
    </div>
  );
}
