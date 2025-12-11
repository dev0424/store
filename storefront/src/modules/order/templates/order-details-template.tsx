"use client";

import React from "react";
import { StoreOrder } from "@medusajs/types";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Items from "@modules/order/components/items";
import OrderDetails from "@modules/order/components/order-details";
import OrderSummary from "@modules/order/components/order-summary";
import ShippingDetails from "@modules/order/components/shipping-details";
import { HiChevronLeft as ChevronLeft } from "react-icons/hi";

type Props = {
  order: StoreOrder;
};

const OrderDetailsTemplate = ({ order }: Props) => {
  return (
    <div className="flex flex-col justify-center gap-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <LocalizedClientLink
            href="/account/orders"
            className="flex items-center gap-2 text-ui-fg-subtle hover:text-ui-fg-base"
            data-testid="back-to-overview-button"
          >
            <ChevronLeft size={28} className="mb-[6px]" />
          </LocalizedClientLink>
          <h1 className="text-2xl-semi">Détails de la commande</h1>
        </div>
      </div>
      <div
        className="flex h-full w-full flex-col gap-4 bg-white"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />
        <Items order={order} />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />
      </div>
    </div>
  );
};

export default OrderDetailsTemplate;
