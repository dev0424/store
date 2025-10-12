import React from "react";
import { Metadata } from "next";
import PageHeaderBanner from "@modules/common/components/page-header-banner";
import ContactForm from "@modules/contact/contact-form";
import Image from "next/image";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";

export const metadata: Metadata = {
  title: "RSPI Store",
  description: "Welcome to RSPI Store.",
};

const ContactPage = () => {
  return (
    <div>
      <PageHeaderBanner imageSrc={"/images/hero.webp"}>
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
      </PageHeaderBanner>
      <section className="content-container grid grid-cols-1 justify-between gap-8 py-8 sm:grid-cols-3 sm:gap-4 sm:py-16">
        <div>
          <p className="text-2xl font-black text-ui-fg-base">Chat with us</p>
          <p className="text-ui-fg-subtle">Lorem ipsum dolor sit amet.</p>
          <div className="mt-2 flex items-center gap-1">
            <HiOutlineMail size={20} />
            <a href="mailto:email@email.com" className="underline">
              email@email.com
            </a>
          </div>
        </div>
        <div>
          <p className="text-2xl font-black text-ui-fg-base">Call us</p>
          <p className="text-ui-fg-subtle">Consectetur adipisicing elit.</p>
          <div className="mt-2 flex items-center gap-1">
            <HiOutlinePhone size={20} />
            <a href="tel:+123456789" className="underline">
              +123456789
            </a>
          </div>
        </div>
        <div>
          <p className="text-2xl font-black text-ui-fg-base">Visit us</p>
          <p className="text-ui-fg-subtle">Dignissimos, dolorem.</p>
          <div className="mt-2 flex items-center gap-1">
            <HiOutlineLocationMarker size={20} />
            <p className="underline">5 Av. Anatole France, 75007 Paris</p>
          </div>
        </div>
      </section>
      <section className="content-container grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 sm:py-16">
        <div className="order-2 flex flex-col gap-2 sm:order-1">
          <div>
            <p className="text-2xl font-black text-accent-primary sm:text-4xl">
              Have a question?
            </p>
            <p className="text-2xl font-black sm:text-4xl">
              Our team is happy to help you
            </p>
          </div>
          <p className="mb-2 text-ui-fg-subtle">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet,
            natus.
          </p>
          <ContactForm />
        </div>
        <div className="relative order-1 h-64 w-full sm:order-2 sm:h-auto">
          <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
            <blockquote className="text-2xl font-bold text-white">
              “Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusamus consequuntur id magnam maxime mollitia.”
            </blockquote>
            <p className="text-lg text-white">Lorem Ipsum</p>
          </div>
          <Image
            src="/images/contact.webp"
            alt="RSPI Store"
            fill
            className="rounded-md object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
