import React from "react";
import { toArray } from "@lib/util/toArray";
import { ProductWithDocument } from "../../../../types/product";
import ProductDocument from "@modules/products/components/product-document";
import Divider from "@modules/common/components/divider";

type Props = {
  product: ProductWithDocument;
};

const ProductDocuments = ({ product }: Props) => {
  return (
    <div className="text-small-regular flex flex-col gap-4 rounded-md bg-[#F4F4F4] p-4">
      <div>
        <h1 className="text-left text-2xl text-ui-fg-base">Téléchargements</h1>
        <Divider />
      </div>
      {toArray(product.product_document)?.length ? (
        <div className="flex flex-col gap-4">
          {toArray(product.product_document)?.map((document) => (
            <ProductDocument key={document.id} document={document} />
          ))}
        </div>
      ) : (
        <p className={"text-sm text-ui-fg-subtle"}>
          Il n'y a aucun document pour ce produit.
        </p>
      )}
    </div>
  );
};

export default ProductDocuments;
