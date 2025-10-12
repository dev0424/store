import React from "react";
import { HiSearch } from "react-icons/hi";

const NoResult = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <HiSearch size={40} className="text-ui-fg-subtle" />
      <div className="flex flex-col items-center">
        <h1 className="text-xl-semi text-ui-fg-base">Aucun produit trouvé</h1>
        <p className="text-md text-ui-fg-subtle">
          Impossible de trouver des produits correspondants à votre sélection.
        </p>
      </div>
    </div>
  );
};

export default NoResult;
