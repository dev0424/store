import { StoreProductVariant } from "@medusajs/types";
import { Text } from "@medusajs/ui";

type Props = {
  variant: StoreProductVariant | undefined;
  "data-testid"?: string;
  "data-value"?: StoreProductVariant;
};

const LineItemOptions = ({
  variant,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: Props) => {
  return (
    <Text
      data-testid={dataTestid}
      data-value={dataValue}
      className="txt-medium inline-block w-full overflow-hidden text-ellipsis font-sans text-ui-fg-subtle"
    >
      Variante: {variant?.title}
    </Text>
  );
};

export default LineItemOptions;
