import React from "react";
import ImageCarouselThumbnail from "@modules/products/components/image-carousel-thumbnail";
import { StoreProductImage } from "@medusajs/types";

type Props = {
  images: StoreProductImage[];
  selectedIndex: number;
  onClick: (index: number) => void;
};

const ImageCarouselThumbnails = ({ images, selectedIndex, onClick }: Props) => {
  return (
    <div className="flex gap-2 p-1">
      {images.map((image, index) => (
        <ImageCarouselThumbnail
          key={index}
          src={image.url}
          priority={index <= 4}
          alt={`Product image ${index + 1}`}
          onClick={() => onClick(index)}
          isSelected={selectedIndex === index}
        />
      ))}
    </div>
  );
};

export default ImageCarouselThumbnails;
