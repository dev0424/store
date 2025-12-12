"use client";

import { convertToLocale } from "@lib/util/money";
import React from "react";
import { getShippingOptionText } from "@lib/util/cart";
import { StoreCart } from "@medusajs/types";

type Props = {
  cart: StoreCart;
};

const CartTotals = ({ cart }: Props) => {
  const {
    currency_code,
    total,
    subtotal,
    tax_total,
    discount_total,
    gift_card_total,
    shipping_subtotal,
  } = cart;

  return (
    <div>
      <div className="txt-medium flex flex-col gap-y-2 font-sans text-ui-fg-subtle">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-1">
            Sous-total (hors frais de livraison et TVA)
          </span>
          <span data-testid="cart-subtotal" data-value={subtotal || 0}>
            {convertToLocale({ amount: subtotal ?? 0, currency_code })}
          </span>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: discount_total ?? 0, currency_code })}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>Livraison</span>
          {/*<span data-testid="cart-shipping" data-value={shipping_subtotal || 0}>*/}
          {/*  {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}*/}
          {/*</span>*/}
          <span>{getShippingOptionText(cart)}</span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-x-1">TVA</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0}>
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>Carte cadeau</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: gift_card_total ?? 0, currency_code })}
            </span>
          </div>
        )}
      </div>
      <div className="my-4 h-px w-full border-b border-gray-200" />
      <div className="txt-medium mb-2 flex items-center justify-between font-sans text-ui-fg-base">
        <span>Total</span>
        <span
          className="txt-xlarge-plus font-sans font-bold"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
      <div className="mt-4 h-px w-full border-b border-gray-200" />
    </div>
  );
};

export default CartTotals;
