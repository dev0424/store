"use client";

import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton } from "@modules/home/components/featured-products/product-carousel-buttons";
import { StoreProductImage } from "@medusajs/types";
import Image from "next/image";
import ImageCarouselThumbnails from "@modules/products/components/image-carousel-thumbnails";

type Props = {
  images: StoreProductImage[];
};

const ImageCarousel = ({ images }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const showThumbnails = images.length > 1;

  const onClickThumbnail = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) {
        return;
      }
      emblaMainApi.scrollTo(index);
      setSelectedIndex(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onClickDot = useCallback(
    (index: number) => {
      if (!emblaMainApi) {
        return;
      }
      emblaMainApi.scrollTo(index);
      setSelectedIndex(index);
    },
    [emblaMainApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) {
      return;
    }
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) {
      return;
    }
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);

    return () => {
      // Cleanup
      emblaMainApi.off("select", onSelect).on("reInit", onSelect);
    };
  }, [emblaMainApi, onSelect]);

  return (
    <div className="relative flex flex-col gap-2 p-1">
      <div className="overflow-hidden" ref={emblaMainRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[16/9] w-full min-w-0 flex-[0_0_100%] transform-gpu"
            >
              <Image
                src={image.url}
                priority={index <= 2}
                className="absolute rounded-rounded"
                alt={`Product image ${index + 1}`}
                fill
                sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {showThumbnails ? (
        <div className="absolute bottom-6 left-1/2 flex w-max -translate-x-1/2 transform gap-1 rounded-rounded bg-white p-2 shadow-elevation-card-rest md:hidden">
          {emblaMainApi
            ?.scrollSnapList()
            .map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onClickDot(index)}
                isSelected={selectedIndex === index}
              />
            ))}
        </div>
      ) : null}

      {showThumbnails ? (
        <div className="hidden overflow-hidden md:block" ref={emblaThumbsRef}>
          <ImageCarouselThumbnails
            images={images}
            onClick={onClickThumbnail}
            selectedIndex={selectedIndex}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ImageCarousel;
