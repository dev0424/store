import { Text } from "@medusajs/ui";
import Thumbnail from "@modules/products/components/thumbnail";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { HttpTypes } from "@medusajs/types";

export type ProductHit = {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  thumbnail: string | null;
  variants: HttpTypes.StoreProductVariant[];
  collection_handle: string | null;
  collection_id: string | null;
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
      className={"w-full"}
    >
      <div className="flex items-center gap-6">
        <Thumbnail
          thumbnail={hit.thumbnail}
          size="square"
          className="group h-20 w-20"
        />
        <div className="group flex flex-col justify-between">
          <div className="flex flex-col">
            <Text
              className="text-ui-fg-subtle"
              data-testid="search-result-title"
            >
              {hit.title}
            </Text>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  );
};

export default Hit;
