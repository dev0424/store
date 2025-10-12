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
      <h1 className="text-left text-2xl text-ui-fg-base">Caractéristiques</h1>

      <div className={"flex flex-col gap-2 divide-y text-sm"}>
        <ProductSpec name={"Matériel"} value={product.material} />
        <ProductSpec
          name={"Poids"}
          value={product.weight ? `${product.weight} g` : "-"}
        />
        <ProductSpec name={"Hauteur"} value={product.height} />
        <ProductSpec name={"Largeur"} value={product.width} />
        <ProductSpec name={"Longueur"} value={product.length} />

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
