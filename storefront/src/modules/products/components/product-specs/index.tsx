import React from "react";
import { ProductWithDocument } from "../../../../types/product";
import ProductSpec from "@modules/products/components/product-specs/product-spec";

const formatSpecKey = (key: string) => {
  // Replace underscores with spaces
  const withSpaces = key.replace(/_/g, " ");
  // Capitalize the first letter
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
};

type Props = {
  product: ProductWithDocument;
};

const ProductSpecs = ({ product }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-left text-2xl text-ui-fg-base">Specifications</h1>

      <div className={"flex flex-col gap-2 divide-y text-sm"}>
        <ProductSpec name={"Material"} value={product.material} />
        <ProductSpec
          name={"Weight"}
          value={product.weight ? `${product.weight} g` : "-"}
        />
        <ProductSpec name={"Height"} value={product.height} />
        <ProductSpec name={"Width"} value={product.width} />
        <ProductSpec name={"Length"} value={product.length} />

        {product.metadata
          ? Object.entries(product.metadata).map(([key, value]) => (
              <ProductSpec
                key={key}
                name={formatSpecKey(key)}
                value={value as string}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default ProductSpecs;
