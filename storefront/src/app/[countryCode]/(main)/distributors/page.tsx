import React from "react";
import { Metadata } from "next";
import SearchDistributors from "@modules/distributors/templates/search-distributors";

export const metadata: Metadata = {
  title:
    "RSPI | Équipements et outillage technique pour professionnels de l’automobile",
  description:
    "RSPI fournit des outils et équipements techniques performants pour les ateliers et garages pros. Large stock, livraison rapide, qualité garantie — l’innovation au service des experts de l’automobile.",
};

const DistributorsPage = () => {
  return (
    <div>
      <SearchDistributors />
    </div>
  );
};

export default DistributorsPage;
