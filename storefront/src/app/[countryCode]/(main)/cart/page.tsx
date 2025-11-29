import { retrieveCart } from "@lib/data/cart";
import { retrieveCustomer } from "@lib/data/customer";
import CartTemplate from "@modules/cart/templates";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isCustomerApproved } from "@lib/util/customer";
import { getCartInventory } from "@lib/util/cart";

export const metadata: Metadata = {
  title: "Panier",
  description: "Voir votre panier.",
};

export default async function Cart() {
  const customer = await retrieveCustomer();

  if (!isCustomerApproved(customer)) {
    return notFound();
  }

  const cart = await retrieveCart().catch((error) => {
    console.error(error);
    return notFound();
  });

  const inventory = await getCartInventory(cart);

  return <CartTemplate cart={cart} customer={customer} inventory={inventory} />;
}
