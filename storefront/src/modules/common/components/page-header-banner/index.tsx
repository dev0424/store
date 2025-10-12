import React, { ReactNode } from "react";
import { getImageProps } from "next/image";
import { getImageSet } from "@lib/util/image";

type Props = {
  imageSrc: string;
  children?: ReactNode;
};

const PageHeaderBanner = ({ imageSrc, children }: Props) => {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: "",
    width: 1440,
    height: 1080,
    src: imageSrc,
  });

  const backgroundImage = getImageSet(srcSet);

  const style = {
    backgroundImage,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section className={"relative h-[25vh] w-full"}>
      <div className="absolute inset-0 z-0 block" style={style} />
      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/40" />
      <div className="content-container relative z-10 flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
        {children}
      </div>
    </section>
  );
};

export default PageHeaderBanner;
