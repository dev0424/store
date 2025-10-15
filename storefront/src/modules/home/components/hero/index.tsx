import React from "react";
import { getImageProps } from "next/image";
import BrowserWidget from "@modules/home/components/browser-widget";
import { listCategories } from "@lib/data/categories";
import { getImageSet } from "@lib/util/image";

const Hero = async () => {
  const categories = await listCategories();

  const {
    props: { srcSet },
  } = getImageProps({
    alt: "",
    width: 1440,
    height: 1080,
    src: "/images/hero.webp",
  });

  const backgroundImage = getImageSet(srcSet);

  const style = {
    backgroundImage,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="relative w-full sm:h-[60vh]">
      {/* Video visible on sm and up */}
      <video
        className="absolute inset-0 z-0 hidden h-full w-full object-cover object-top sm:block"
        src="/images/background.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Image visible on mobile only */}
      <div className="absolute inset-0 z-0 block sm:hidden" style={style} />
      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      <div className="content-container relative z-10 grid h-full grid-cols-1 items-center justify-center gap-8 p-6 text-center sm:inset-0 sm:grid-cols-[1.5fr_1fr] sm:text-left">
        <span className={"flex flex-col gap-2"}>
          <h1 className={"text-3xl font-black text-accent-primary sm:text-5xl"}>
            L’innovation dans vos mains
          </h1>
          <h2 className={"text-xl font-black text-white sm:text-4xl"}>
            Pour ceux qui font rouler le monde.
          </h2>
          <h2 className={"text-xl font-normal text-white sm:text-xl"}>
            Des équipements et outils techniques conçus pour les professionnels
            de l’automobile et du poids lourd.
          </h2>
        </span>
        <BrowserWidget categories={categories} />
      </div>
    </div>
  );
};

export default Hero;
