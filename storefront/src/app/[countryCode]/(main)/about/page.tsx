import React from "react";
import Image, { getImageProps } from "next/image";
import { getImageSet } from "@lib/util/image";
import { Metadata } from "next";
import ContactBanner from "@modules/account/components/contact-banner";

export const metadata: Metadata = {
  title: "RSPI Store",
  description: "Welcome to RSPI Store.",
};

const AboutPage = () => {
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
    <div>
      <section className="relative h-[60vh] w-full">
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
      <section className="content-container py-8 sm:py-16">
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 sm:gap-16">
          <h1 className="text-left text-3xl font-black text-ui-fg-base">
            Lorem ipsum dolor sit amet,{" "}
            <span className="text-accent-primary">
              consectetur adipisicing elit.
            </span>
          </h1>
          <p className="text-justify text-ui-fg-subtle">
            A accusamus accusantium adipisci aliquid animi aperiam atque
            corporis, cupiditate deserunt dignissimos dolor doloribus dolorum
            error esse ex expedita facilis hic impedit inventore ipsam
            laudantium maiores minus necessitatibus nihil numquam pariatur
            perspiciatis porro provident quam quasi quia quisquam repellendus
            similique ut, vel veritatis voluptates?
          </p>
        </div>
      </section>
      <section className="content-container relative">
        <Image
          src={"/images/about.webp"}
          className="rounded-md"
          alt={"RSPI Store"}
          width={2400}
          height={600}
        />
      </section>
      <section className="content-container grid grid-cols-3 gap-4 py-8 text-center sm:py-16">
        <div>
          <p className="text-ui-fg-subtle">Lorem ipsum dolor sit amet</p>
          <p className="text-4xl font-black text-ui-fg-base">290+</p>
        </div>
        <div>
          <p className="text-ui-fg-subtle">Consectetur adipisicing elit</p>
          <p className="text-4xl font-black text-ui-fg-base">12+</p>
        </div>
        <div>
          <p className="text-ui-fg-subtle">
            Consequuntur delectus laborum odio qui
          </p>
          <p className="text-4xl font-black text-ui-fg-base">20K+</p>
        </div>
      </section>
      <ContactBanner />
    </div>
  );
};

export default AboutPage;
