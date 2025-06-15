"use client";

import React from "react";
import { getImageProps } from "next/image";
import BrowserWidget from "@modules/home/components/browser-widget";

function getBackgroundImage(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}

const Hero = () => {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: "",
    width: 1440,
    height: 1080,
    src: "/images/hero.webp",
  });
  const backgroundImage = getBackgroundImage(srcSet);

  const style = {
    backgroundImage,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="relative w-full sm:h-[60vh]" style={style}>
      <div className="content-container z-10 grid h-full grid-cols-1 items-center justify-center gap-6 p-6 text-center sm:inset-0 sm:grid-cols-2 sm:text-left">
        <span className={"flex flex-col gap-2"}>
          <h1
            className={
              "text-3xl font-black text-white sm:max-w-sm sm:text-5xl sm:leading-[60px]"
            }
          >
            Lorem ipsum dolor sit amet.
          </h1>
          <h2 className={"text-xl font-normal text-white sm:text-2xl"}>
            Id maxime natus nisi quae quisquam sed.
          </h2>
        </span>
        <div className={"sm:max-w-lg"}>
          <BrowserWidget />
        </div>
      </div>
    </div>
  );
};

export default Hero;
