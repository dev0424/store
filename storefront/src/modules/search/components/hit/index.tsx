import Thumbnail from "@modules/products/components/thumbnail";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { HttpTypes } from "@medusajs/types";
import { convertToLocale } from "@lib/util/money";

export type ProductHit = {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  thumbnail: string | null;
  variants: HttpTypes.StoreProductVariant[];
  collection_handle: string | null;
  collection_id: string | null;
  min_price: number;
};

type HitProps = {
  hit: ProductHit;
};

const Hit = ({ hit }: HitProps) => {
  return (
    <LocalizedClientLink
      key={hit.id}
      href={`/products/${hit.handle}`}
      data-testid="search-result"
      className="w-full"
    >
      <div className="flex items-center gap-6">
        <Thumbnail
          thumbnail={hit.thumbnail}
          size="square"
          className="group h-20 w-20"
        />
        <div className="group flex flex-col justify-between">
          <div className="flex flex-col">
            <p
              className="font-sans text-ui-fg-subtle"
              data-testid="search-result-title"
            >
              {hit.title}
            </p>
            <p className="font-sans text-lg font-bold text-black">
              {convertToLocale({
                amount: hit.min_price,
                currency_code: "eur",
              })}
            </p>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  );
};

export default Hit;
