"use client";

import { Button } from "@medusajs/ui";

import QuoteCard from "../quote-card";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { StoreOrder } from "@medusajs/types";

type Props = {
  quotes: StoreOrder[];
};

const QuoteOverview = ({ quotes }: Props) => {
  if (quotes?.length) {
    return (
      <div className="flex w-full flex-col gap-y-8">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className="border-b border-gray-200 pb-6 last:border-none last:pb-0"
          >
            <QuoteCard quote={quote} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex w-full flex-col items-center gap-y-4"
      data-testid="no-quotes-container"
    >
      <h2 className="text-large-semi">Vous n'avez aucune devis</h2>
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

export default QuoteOverview;
