"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton } from "@modules/common/components/carousel-buttons";
import { StoreProductImage } from "@medusajs/types";
import Image from "next/image";
import ImageCarouselThumbnails from "@modules/products/components/image-carousel-thumbnails";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnail from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const showThumbnails = images.length > 1;

  const lightboxSlides = useMemo(
    () =>
      images.map((image) => ({
        src: image.url,
      })),
    [images],
  );

  const toggleLightbox = () => setIsLightboxOpen((prevState) => !prevState);

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
    <>
      <div className="relative flex flex-col gap-2">
        <div className="overflow-hidden" ref={emblaMainRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={toggleLightbox}
                className="relative aspect-[4/3] w-full min-w-0 flex-[0_0_100%] transform-gpu cursor-pointer"
              >
                <Image
                  src={image.url}
                  priority={index <= 2}
                  className="absolute rounded-rounded"
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {showThumbnails ? (
          <div className={"mt-2 flex w-full justify-center"}>
            <div className="flex w-max transform gap-2 md:hidden">
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
      <Lightbox
        open={isLightboxOpen}
        close={toggleLightbox}
        slides={lightboxSlides}
        index={selectedIndex}
        plugins={[Fullscreen, Zoom, Thumbnail, Counter]}
        styles={{
          container: { backgroundColor: "rgba(255,255,255,1)" },
          thumbnailsContainer: { backgroundColor: "rgba(255,255,255,1)" },
        }}
      />
    </>
  );
};

export default ImageCarousel;
