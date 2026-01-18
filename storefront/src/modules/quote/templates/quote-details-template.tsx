"use client";

import React from "react";
import { StoreOrder } from "@medusajs/types";
import Items from "@modules/order/components/items";
import ShippingDetails from "@modules/order/components/shipping-details";
import { Button } from "@medusajs/ui";
import { acceptQuote } from "@lib/data/orders";
import { useParams } from "next/navigation";
import { Tooltip, TooltipProvider } from "@medusajs/ui";
import QuoteDetails from "@modules/order/components/quote-details";
import QuoteSummary from "@modules/order/components/quote-summary";
import DeclineQuoteButton from "@modules/quote/components/decline-quote";
import Divider from "@modules/common/components/divider";

type Props = {
  quote: StoreOrder;
};

const QuoteDetailsTemplate = ({ quote }: Props) => {
  const { countryCode } = useParams();
  const showActionButtons = !!quote.shipping_methods?.length;

  return (
    <div className="flex flex-col justify-center gap-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl-semi">Détails du devis</h1>
        </div>
        <div className="flex gap-2">
          <DeclineQuoteButton
            quoteId={quote.id}
            countryCode={countryCode as string}
          />
          <TooltipProvider>
            <Tooltip
              content={
                showActionButtons
                  ? "Acceptez ce devis pour confirmer votre commande."
                  : "Prix de livraison requis pour accepter ce devis."
              }
            >
              <Button
                variant="primary"
                disabled={!showActionButtons}
                onClick={() => acceptQuote(quote.id, countryCode as string)}
              >
                Accepter
              </Button>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div
        className="flex h-full w-full flex-col gap-4 bg-white"
        data-testid="order-details-container"
      >
        <QuoteDetails quote={quote} showStatus />
        <Items order={quote} />
        <ShippingDetails order={quote} />
        <Divider />
        <QuoteSummary quote={quote} />
      </div>
    </div>
  );
};

export default QuoteDetailsTemplate;
