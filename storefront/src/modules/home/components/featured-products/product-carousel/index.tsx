"use client";

import useEmblaCarousel from "embla-carousel-react";
import React, { ReactNode, useCallback } from "react";
import {
  PrevButton,
  NextButton,
} from "@modules/home/components/featured-products/product-carousel-buttons";

type Props = {
  children: ReactNode;
};

const ProductCarousel = ({ children }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: "auto" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  return (
    <div className="overflow-hidden p-1" ref={emblaRef}>
      <div className="flex gap-4">{children}</div>
      <div className="mt-2 flex justify-end gap-2 p-1">
        <PrevButton onClick={scrollPrev} />
        <NextButton onClick={scrollNext} />
      </div>
    </div>
  );
};

export default ProductCarousel;
