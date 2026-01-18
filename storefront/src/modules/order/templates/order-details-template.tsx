"use client";

import React from "react";
import { StoreOrder } from "@medusajs/types";
import Items from "@modules/order/components/items";
import OrderDetails from "@modules/order/components/order-details";
import OrderSummary from "@modules/order/components/order-summary";
import ShippingDetails from "@modules/order/components/shipping-details";
import Divider from "@modules/common/components/divider";

type Props = {
  order: StoreOrder;
};

const OrderDetailsTemplate = ({ order }: Props) => {
  return (
    <div className="flex flex-col justify-center gap-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
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
        <Divider />
        <OrderSummary order={order} />
      </div>
    </div>
  );
};

export default OrderDetailsTemplate;
