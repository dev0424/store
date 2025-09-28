import React from "react";
import Image from "next/image";
import { clx } from "@medusajs/ui";

type Props = {
  src: string;
  priority?: boolean;
  onClick: VoidFunction;
  alt: string;
  isSelected: boolean;
};

const ImageCarouselThumbnail = ({
  src,
  priority,
  onClick,
  alt,
  isSelected,
}: Props) => {
  return (
    <div
      className={clx(
        "relative aspect-[4/3] w-full min-w-0 flex-[0_0_25%] cursor-pointer overflow-hidden rounded-rounded border border-transparent transition-shadow duration-150 ease-in-out hover:shadow-elevation-card-rest",
        {
          "border border-ui-border-base": isSelected,
        },
      )}
      onClick={onClick}
    >
      <Image
        src={src}
        priority={priority}
        className="absolute"
        alt={alt}
        fill
        sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default ImageCarouselThumbnail;
