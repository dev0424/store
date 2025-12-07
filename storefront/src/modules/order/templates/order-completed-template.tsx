import { Heading } from "@medusajs/ui";
import CartTotals from "@modules/common/components/cart-totals";
import Items from "@modules/order/components/items";
import OrderDetails from "@modules/order/components/order-details";
import ShippingDetails from "@modules/order/components/shipping-details";
import PaymentDetails from "@modules/order/components/payment-details";
import { StoreOrder } from "@medusajs/types";

type Props = {
  order: StoreOrder;
};

export default async function OrderCompletedTemplate({ order }: Props) {
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
            <span>Votre commande a été passée avec succès.</span>
          </Heading>
          <OrderDetails order={order} />
          <Heading level="h2" className="text-3xl-regular flex flex-row">
            Résumé
          </Heading>
          <Items order={order} />
          <CartTotals cart={order} />
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
        </div>
      </div>
    </div>
  );
}
