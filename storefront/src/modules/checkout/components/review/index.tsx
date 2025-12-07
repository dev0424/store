"use client";

import { Heading, Text, clx } from "@medusajs/ui";

import PaymentButton from "../payment-button";
import { useSearchParams } from "next/navigation";
import { getPaymentButtonText } from "@lib/util/cart";
import { StoreCart } from "@medusajs/types";

type Props = {
  cart: StoreCart;
};

const Review = ({ cart }: Props) => {
  const searchParams = useSearchParams();

  const isOpen = searchParams.get("step") === "review";

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0;

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard);

  return (
    <div className="bg-white">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className={clx(
            "text-3xl-regular flex flex-row items-baseline gap-x-2",
            {
              "pointer-events-none select-none opacity-50": !isOpen,
            },
          )}
        >
          Vérification
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="mb-6 flex w-full items-start gap-x-1">
            <div className="w-full">
              <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                En cliquant sur le bouton « {getPaymentButtonText(cart)} », vous
                confirmez avoir lu, compris et accepté nos Conditions
                d’utilisation, Conditions de vente et Politique de retour, et
                reconnaissez avoir pris connaissance de la Politique de
                confidentialité de RSPI.
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  );
};

export default Review;
