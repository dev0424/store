"use client";

import useEmblaCarousel from "embla-carousel-react";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import {
  PrevButton,
  NextButton,
  DotButton,
} from "@modules/common/components/carousel-buttons";
import { EmblaCarouselType } from "embla-carousel";

type Props = {
  children: ReactNode;
};

const Carousel = ({ children }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto",
    align: "end",
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(true);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  const showNavigation = !isPrevButtonDisabled || !isNextButtonDisabled;

  const scrollToPrevious = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollToNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setIsPrevButtonDisabled(!emblaApi.canScrollPrev());
    setIsNextButtonDisabled(!emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  useEffect(() => {
    if (emblaApi) {
      onInit(emblaApi);
      onSelect(emblaApi);
      emblaApi
        .on("reInit", onInit)
        .on("reInit", onSelect)
        .on("select", onSelect);
    }
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="overflow-hidden p-1" ref={emblaRef}>
      <div className="mx-6 flex gap-4 sm:mx-0">{children}</div>
      {showNavigation ? (
        <div className="mt-2 flex justify-between gap-2 px-6 sm:p-0">
          <PrevButton
            onClick={scrollToPrevious}
            disabled={isPrevButtonDisabled}
          />
          <div className="flex w-max items-center gap-2 p-2">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                isSelected={index === selectedIndex}
              />
            ))}
          </div>
          <NextButton onClick={scrollToNext} disabled={isNextButtonDisabled} />
        </div>
      ) : null}
    </div>
  );
};

export default Carousel;
