import React, { Suspense } from "react";
import ProductActions from "@modules/products/components/product-actions";
import RelatedProducts from "@modules/products/components/related-products";
import ProductInfo from "@modules/products/templates/product-info";
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products";
import { notFound } from "next/navigation";
import ProductActionsWrapper from "./product-actions-wrapper";
import { HttpTypes } from "@medusajs/types";
import ImageCarousel from "@modules/products/components/image-carousel";
import { ProductWithDocument } from "../../../types/product";
import ProductSpecs from "@modules/products/components/product-specs";
import ProductDocuments from "@modules/products/components/product-documents";
import ContactBanner from "@modules/account/components/contact-banner";
import ProductBenefits from "@modules/products/components/product-benefits";

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
      <div className="lg:content-container grid grid-cols-1 items-start py-6 md:grid-cols-[3fr_2fr] sm-only:gap-6">
        {/* Left column */}
        <div className="order-1 flex flex-col gap-8 md:order-1 md:border-r md:pr-8">
          <ImageCarousel images={product.images || []} />
          <div className="hidden md:block">
            <ProductSpecs product={product} />
          </div>
        </div>

        {/* Right column (sticky on desktop) */}
        <div className="sm-only:content-container order-2 md:sticky md:top-[168px] md:order-2 md:pl-8">
          <div className="flex flex-col gap-8">
            <ProductInfo product={product} />
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
            <ProductDocuments product={product} />
            <ProductBenefits />
          </div>
        </div>

        {/* Mobile: Product specs below actions */}
        <div className="sm-only:content-container order-3 block md:hidden">
          <ProductSpecs product={product} />
        </div>
      </div>

      {/* Related products */}
      <div
        className="content-container my-16"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>

      <ContactBanner />
    </>
  );
};

export default ProductTemplate;
