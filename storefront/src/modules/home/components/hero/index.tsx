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
      {/* Image */}
      <div className="absolute inset-0 z-0 block" style={style} />
      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/60" />

      <div className="content-container relative z-10 grid h-full grid-cols-1 items-center justify-center gap-8 p-6 text-center sm:inset-0 sm:grid-cols-[1.5fr_1fr] sm:text-left">
        <div className="flex max-w-xl flex-col">
          <h1>
            <span className="text-2xl font-black text-accent-primary sm:text-5xl">
              RSPI redonne la parole{" "}
            </span>
            <span className="text-2xl font-black text-white sm:text-5xl">
              aux professionnels
            </span>
          </h1>
          <h2 className="text-md mt-2 font-light text-white sm:text-xl">
            Des équipements et outils techniques conçus pour les professionnels
            de l’automobile et du poids lourd.
          </h2>
        </div>
        <BrowserWidget categories={categories} />
      </div>
    </div>
  );
};

export default Hero;
