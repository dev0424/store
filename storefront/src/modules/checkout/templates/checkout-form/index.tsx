import { listCartShippingMethods } from "@lib/data/fulfillment";
import { listCartPaymentMethods } from "@lib/data/payment";
import { StoreCart, StoreCustomer } from "@medusajs/types";
import Addresses from "@modules/checkout/components/addresses";
import Payment from "@modules/checkout/components/payment";
import Review from "@modules/checkout/components/review";
import Shipping from "@modules/checkout/components/shipping";
import Divider from "@modules/common/components/divider";

type Props = {
  cart: StoreCart | null;
  customer: StoreCustomer | null;
};

export default async function CheckoutForm({ cart, customer }: Props) {
  if (!cart) {
    return null;
  }

  const shippingMethods = await listCartShippingMethods(cart.id);
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "");

  if (!shippingMethods || !paymentMethods) {
    return null;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-y-8">
      <Addresses cart={cart} customer={customer} />
      <Divider />
      <Shipping cart={cart} availableShippingMethods={shippingMethods} />
      <Divider />
      <Payment cart={cart} availablePaymentMethods={paymentMethods} />
      <Divider />
      <Review cart={cart} />
    </div>
  );
}
