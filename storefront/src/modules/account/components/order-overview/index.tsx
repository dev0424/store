"use client";

import { Button } from "@medusajs/ui";
import OrderCard from "../order-card";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { StoreOrder } from "@medusajs/types";

type Props = {
  orders: StoreOrder[];
};

const OrderOverview = ({ orders }: Props) => {
  if (orders?.length) {
    return (
      <div className="flex w-full flex-col gap-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border-b border-gray-200 pb-6 last:border-none last:pb-0"
          >
            <OrderCard order={order} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex w-full flex-col items-center gap-y-4"
      data-testid="no-orders-container"
    >
      <h2 className="text-large-semi">Vous n'avez aucune commande</h2>
      <div className="mt-4">
        <LocalizedClientLink href="/" passHref>
          <Button data-testid="continue-shopping-button">
            Continuez vos achats
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default OrderOverview;
