import { Button } from "@medusajs/ui";
import { useMemo } from "react";

import Thumbnail from "@modules/products/components/thumbnail";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { convertToLocale } from "@lib/util/money";
import { StoreOrder } from "@medusajs/types";

type Props = {
  quote: StoreOrder;
};

const QuoteCard = ({ quote }: Props) => {
  const numberOfLines = useMemo(() => {
    return (
      quote.items?.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0) ?? 0
    );
  }, [quote]);

  const numberOfProducts = useMemo(() => {
    return quote.items?.length ?? 0;
  }, [quote]);

  return (
    <div className="flex flex-col bg-white" data-testid="order-card">
      <div className="text-large-semi mb-1 uppercase">
        #<span data-testid="order-display-id">{quote.display_id}</span>
      </div>
      <div className="text-small-regular flex items-center divide-x divide-gray-200 text-ui-fg-base">
        <span className="pr-2" data-testid="order-created-at">
          {new Date(quote.created_at).toDateString()}
        </span>
        <span className="px-2" data-testid="order-amount">
          {convertToLocale({
            amount: quote.total,
            currency_code: quote.currency_code,
          })}
        </span>
        <span className="pl-2">{`${numberOfLines} ${
          numberOfLines > 1 ? "articles" : "article"
        }`}</span>
      </div>
      <div className="my-4 grid grid-cols-2 gap-4 small:grid-cols-4">
        {quote.items?.slice(0, 3).map((i) => {
          return (
            <div
              key={i.id}
              className="flex flex-col gap-y-2"
              data-testid="order-item"
            >
              <Thumbnail thumbnail={i.thumbnail} images={[]} size="full" />
              <div className="text-small-regular flex items-center text-ui-fg-base">
                <span
                  className="font-semibold text-ui-fg-base"
                  data-testid="item-title"
                >
                  {i.title}
                </span>
                <span className="ml-2">x</span>
                <span data-testid="item-quantity">{i.quantity}</span>
              </div>
            </div>
          );
        })}
        {numberOfProducts > 4 && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <span className="text-small-regular text-ui-fg-base">
              + {numberOfLines - 4}
            </span>
            <span className="text-small-regular text-ui-fg-base">
              Voir plus
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <LocalizedClientLink href={`/account/quotes/details/${quote.id}`}>
          <Button data-testid="order-details-link" variant="secondary">
            Voir les détails
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default QuoteCard;
