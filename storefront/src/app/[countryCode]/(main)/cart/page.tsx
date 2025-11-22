import { retrieveCart } from "@lib/data/cart";
import { retrieveCustomer } from "@lib/data/customer";
import CartTemplate from "@modules/cart/templates";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isCustomerApproved } from "@lib/util/customer";

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
};

export default async function Cart() {
  const cart = await retrieveCart().catch((error) => {
    console.error(error);
    return notFound();
  });

  const customer = await retrieveCustomer();

  if (!isCustomerApproved(customer)) {
    return notFound();
  }

  return <CartTemplate cart={cart} customer={customer} />;
}
