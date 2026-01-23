import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import ContactBanner from "@modules/account/components/contact-banner";
import PageHeaderBanner from "@modules/common/components/page-header-banner";
import {
  HiShieldCheck,
  HiTrendingUp,
  HiChat,
  HiLightBulb,
} from "react-icons/hi";
import OurVision from "@modules/home/components/our-vision";

export const metadata: Metadata = {
  title:
    "RSPI | Équipements et outillage technique pour professionnels de l’automobile",
  description:
    "RSPI fournit des outils et équipements techniques performants pour les ateliers et garages pros. Large stock, livraison rapide, qualité garantie — l’innovation au service des experts de l’automobile.",
};

const AboutPage = () => {
  return (
    <section>
      <PageHeaderBanner imageSrc={"/images/hero.webp"}>
        <h1 className="max-w-2xl">
          <span className="text-2xl font-black text-accent-primary sm:text-5xl">
            Partenaire des{" "}
          </span>
          <span className="text-2xl font-black text-white sm:text-5xl">
            distributeurs professionnels
          </span>
        </h1>
      </PageHeaderBanner>
      <section className="content-container grid grid-cols-2 gap-16 py-8 sm:py-16">
        <p className="text-justify text-ui-fg-subtle">
          Créée par des experts du secteur de l’équipement d’atelier, RSPI est
          née d’une idée simple : redonner du levier tarifaire et stratégique
          aux distributeurs. Notre objectif est clair — fournir les meilleurs
          produits au meilleur prix, sans compromis sur la qualité, la fiabilité
          ou le service.
        </p>
        <p className="text-justify text-ui-fg-subtle">
          RSPI s’adresse exclusivement aux distributeurs spécialisés, qu’elle
          accompagne dans leur croissance grâce à une offre pensée pour leur
          rentabilité, leur autonomie et la satisfaction de leurs clients
          finaux.
        </p>
      </section>
      <OurVision />
      <section className="content-container grid grid-cols-[1fr_1.5fr] gap-16 py-8 sm:py-16">
        <div className="relative sm:h-auto">
          <Image
            src={"/images/about.webp"}
            className="rounded-md object-cover"
            alt="RSPI"
            fill
          />
        </div>
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-2">
            <p className="text-4xl font-black text-ui-fg-base">Notre vision</p>
            <p className="text-ui-fg-subtle">
              RSPI ambitionne de devenir le partenaire privilégié des
              distributeurs français dans le domaine de l’outillage
              professionnel. Nous croyons qu’un distributeur fort, soutenu et
              compétitif crée un marché plus sain, plus équitable et plus
              durable pour tous.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-4xl font-black text-ui-fg-base">
              Notre engagement
            </p>
            <p className="text-ui-fg-subtle">RSPI s’engage à :</p>
            <ul className="list-inside list-disc text-ui-fg-subtle">
              <li>
                Garantir un rapport qualité/prix optimal, sans intermédiaires
                inutiles.
              </li>
              <li>
                Préserver la marge et la compétitivité de ses distributeurs
                partenaires.
              </li>
              <li>
                Maintenir un haut niveau d’exigence technique sur chaque
                produit.
              </li>
              <li>
                Assurer une logistique rapide et des livraisons fiables partout
                en France.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="content-container flex flex-col gap-8 pb-8 sm:pb-16">
        <div>
          <p className="text-center text-4xl font-black text-ui-fg-base">
            Nos valeurs
          </p>
        </div>
        <div className="grid grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center gap-4 rounded-md bg-[#F4F4F4] p-4">
            <HiShieldCheck size={40} />
            <p className="text-xl font-black">Confiance</p>
            <p className="text-ui-fg-subtle">
              Construire des relations transparentes et durables.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-md bg-[#F4F4F4] p-4">
            <HiTrendingUp size={40} />
            <p className="text-xl font-black">Performance</p>
            <p className="text-ui-fg-subtle">
              Offrir la qualité que vos clients attendent, au prix que vous
              méritez.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-md bg-[#F4F4F4] p-4">
            <HiChat size={40} />
            <p className="text-xl font-black">Soutien</p>
            <p className="text-ui-fg-subtle">
              Être à vos côtés avant, pendant et après la vente.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-md bg-[#F4F4F4] p-4">
            <HiLightBulb size={40} />
            <p className="text-xl font-black">Innovation</p>
            <p className="text-ui-fg-subtle">
              Anticiper les tendances, simplifier vos approvisionnements, et
              améliorer en continu nos gammes.
            </p>
          </div>
        </div>
      </section>
      <ContactBanner />
    </section>
  );
};

export default AboutPage;
