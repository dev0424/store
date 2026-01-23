import React from "react";
import { HiCheckCircle, HiTruck, HiChat } from "react-icons/hi";
import { BsFillBoxFill } from "react-icons/bs";

const WhyChooseUs = () => {
  return (
    <section className="bg-gradient-to-tr from-background-primary via-background-primary to-background-secondary">
      <div className="content-container py-8 sm:py-16">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h1 className="text-2xl-semi sm:text-4xl-semi font-black text-accent-primary">
              Pourquoi choisir RSPI ?
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-8 font-light text-white sm:grid-cols-4 sm:gap-16">
            <div className="flex flex-col items-center gap-2 sm:gap-4">
              <HiCheckCircle size={48} className="text-accent-primary" />
              <div className="flex flex-col gap-1">
                <p className="text-center font-black">
                  Des solutions à votre mesure
                </p>
                <p className="text-center">
                  Une gamme complète d’outils fiables pour chaque défi du
                  quotidien.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 sm:gap-4">
              <BsFillBoxFill size={40} className="mb-2 text-accent-primary" />
              <div className="flex flex-col gap-1">
                <p className="text-center font-black">
                  Toujours prêts, comme vous
                </p>
                <p className="text-center">
                  90 % de nos produits sont disponibles immédiatement.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 sm:gap-4">
              <HiTruck size={48} className="text-accent-primary" />
              <div className="flex flex-col gap-1">
                <p className="text-center font-black">
                  Livraison rapide et gratuite
                </p>
                <p className="text-center">
                  Livraison offerte dès 500 € d’achat, expédiée sous 48 à 72 h
                  en France métropolitaine.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 sm:gap-4">
              <HiChat size={48} className="text-accent-primary" />
              <div className="flex flex-col gap-1">
                <p className="text-center font-black">
                  Un service conçu pour les pros
                </p>
                <p className="text-center">
                  Support client réactif et outils pensés pour les ateliers
                  exigeants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
