import React from "react";
import {
  HiCog,
  HiCurrencyEuro,
  HiPresentationChartLine,
  HiTruck,
} from "react-icons/hi";

const OurVision = () => {
  return (
    <section className="bg-gradient-to-tr from-background-primary via-background-primary to-background-secondary">
      <div className="content-container py-8 sm:py-16">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h1 className="text-4xl font-black text-accent-primary">
              Notre mission
            </h1>
            <h2 className="text-lg text-white">
              Mettre à disposition des distributeurs :
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-16 font-light text-white sm:grid-cols-4">
            <div className="flex flex-col items-center gap-4">
              <HiCurrencyEuro size={48} className="text-accent-primary" />
              <p className="text-center">
                Des produits techniques de haute qualité à un tarif compétitif
                et stable.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <HiCog size={48} className="text-accent-primary" />
              <p className="text-center">
                Une gamme complète couvrant les besoins de l’automobile, du
                poids lourd et de l’industrie.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <HiTruck size={48} className="text-accent-primary" />
              <p className="text-center">
                Un service logistique réactif, pour garantir la disponibilité
                permanente.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <HiPresentationChartLine
                size={48}
                className="text-accent-primary"
              />
              <p className="text-center">
                Des supports commerciaux et marketing personnalisables pour
                renforcer leur image et leur performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurVision;
