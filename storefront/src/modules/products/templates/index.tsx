import React, { Suspense } from "react";

import ProductActions from "@modules/products/components/product-actions";
import ProductTabs from "@modules/products/components/product-tabs";
import RelatedProducts from "@modules/products/components/related-products";
import ProductInfo from "@modules/products/templates/product-info";
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products";
import { notFound } from "next/navigation";
import ProductActionsWrapper from "./product-actions-wrapper";
import { HttpTypes } from "@medusajs/types";
import ImageCarousel from "@modules/products/components/image-carousel";
import { ProductWithDocument } from "../../../types/product";

type ProductTemplateProps = {
  product: ProductWithDocument;
  region: HttpTypes.StoreRegion;
  countryCode: string;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound();
  }

  return (
    <>
      <div
        className="lg:content-container grid grid-cols-1 gap-6 py-6 md:grid-cols-[3fr_2fr]"
        data-testid="product-container"
      >
        <ImageCarousel images={product?.images || []} />
        <div className="sm-only:content-container flex flex-col gap-y-6">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  );
};

export default ProductTemplate;
