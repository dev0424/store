import React from "react";
import { Metadata } from "next";
import PageHeaderBanner from "@modules/common/components/page-header-banner";
import ContactForm from "@modules/contact/contact-form";
import Image from "next/image";
import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiPhone,
} from "react-icons/hi";

export const metadata: Metadata = {
  title:
    "RSPI | Équipements et outillage technique pour professionnels de l’automobile",
  description:
    "RSPI fournit des outils et équipements techniques performants pour les ateliers et garages pros. Large stock, livraison rapide, qualité garantie — l’innovation au service des experts de l’automobile.",
};

const ContactPage = () => {
  return (
    <div>
      <PageHeaderBanner imageSrc={"/images/hero.webp"}>
        <Image
          src={"/images/logo.png"}
          width={200}
          height={200}
          alt="RSPI logo"
          className="max-w-64 object-cover"
        />
        <h1 className="text-left text-3xl font-black text-ui-fg-base text-white">
          Partenaire des{" "}
          <span className="text-accent-primary">
            distributeurs professionnels.
          </span>
        </h1>
      </PageHeaderBanner>
      <section className="content-container grid grid-cols-1 justify-between gap-8 py-8 sm:grid-cols-3 sm:gap-4 sm:py-16">
        <div>
          <p className="text-2xl font-black text-ui-fg-base">Écrivez-nous</p>
          <div className="mt-2 flex items-center gap-1">
            <HiOutlineMail size={20} />
            <a href="mailto:contact@rspi.com" className="underline">
              contact@rspi.com
            </a>
          </div>
        </div>
        <div>
          <p className="text-2xl font-black text-ui-fg-base">Appelez-nous</p>
          <div className="mt-2 flex items-center gap-1">
            <HiPhone size={20} />
            <a href="tel:+33651018300" className="underline">
              +33 651018300
            </a>
          </div>
        </div>
        <div>
          <p className="text-2xl font-black text-ui-fg-base">Visitez-nous</p>
          <div className="mt-2 flex items-center gap-1">
            <HiOutlineLocationMarker size={20} />
            <p className="underline">
              185 Rue du Canton du Cailloutis, 59279 Loon-Plage
            </p>
          </div>
        </div>
      </section>
      <section className="content-container grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 sm:py-16">
        <div className="order-2 flex flex-col gap-2 sm:order-1">
          <div>
            <p className="text-2xl font-black text-accent-primary sm:text-4xl">
              Une question ?
            </p>
            <p className="text-2xl font-black sm:text-4xl">
              Notre équipe est ravie de vous aider.
            </p>
          </div>
          <ContactForm />
        </div>
        <div className="relative order-1 h-64 w-full sm:order-2 sm:h-auto">
          <Image
            src="/images/contact.webp"
            alt="RSPI"
            fill
            className="rounded-md object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
