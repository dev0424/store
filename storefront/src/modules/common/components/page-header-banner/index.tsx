import React from "react";
import { getImageProps } from "next/image";
import { getImageSet } from "@lib/util/image";

type Props = {
  imageSrc: string;
};

const PageHeaderBanner = ({ imageSrc }: Props) => {
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
    <section className="relative h-[40vh] w-full">
      <div className="absolute inset-0 z-0 block" style={style} />
      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/40" />
      <div className="content-container relative z-10 flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
        <h1
          className={
            "text-3xl font-black text-white sm:text-5xl sm:leading-[60px]"
          }
        >
          Lorem ipsum dolor sit amet.
        </h1>
        <h2 className="text-xl font-normal text-white sm:text-2xl">
          Id maxime natus nisi quae quisquam sed.
        </h2>
      </div>
    </section>
  );
};

export default PageHeaderBanner;
