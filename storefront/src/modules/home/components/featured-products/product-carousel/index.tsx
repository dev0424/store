"use client";

import useEmblaCarousel from "embla-carousel-react";

import React from "react";
import { HttpTypes, StoreProduct } from "@medusajs/types";
import ProductPreview from "@modules/products/components/product-preview";
import Thumbnail from "@modules/products/components/thumbnail";
import { Text } from "@medusajs/ui";
import PreviewPrice from "@modules/products/components/product-preview/price";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

type Props = {
  products: StoreProduct[] | undefined;
  region: HttpTypes.StoreRegion;
};

const ProductCarousel = ({ products, region }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {products?.map((product) => (
          <div className="relative h-full w-full" key={product.id}>
            <div>
              {/*<Thumbnail*/}
              {/*  thumbnail={product.thumbnail}*/}
              {/*  images={product.images}*/}
              {/*  size="small"*/}
              {/*  isFeatured={true}*/}
              {/*/>*/}
              <div className="txt-compact-medium mt-4 flex justify-between">
                <Text className="text-ui-fg-subtle">{product.title}</Text>
                {/*<div className="flex items-center gap-x-2">*/}
                {/*    {cheapestPrice && <PreviewPrice price={cheapestPrice} />}*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
