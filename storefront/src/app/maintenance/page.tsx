import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "RSPI | Équipements et outillage technique pour professionnels de l’automobile",
  description:
    "RSPI fournit des outils et équipements techniques performants pour les ateliers et garages pros. Large stock, livraison rapide, qualité garantie — l’innovation au service des experts de l’automobile.",
};

export default function MaintenancePage() {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 text-gray-800">
          <div className="max-w-2xl rounded-2xl bg-white p-10 text-center shadow-md">
            <h1 className="mb-4 text-2xl font-bold">
              Nous serons bientôt de retour 🚧
            </h1>
            <p className="text-md mb-6">
              Le site est actuellement en maintenance programmée.
              <br />
              Nous travaillons activement pour améliorer votre expérience.
            </p>
            <p className="text-sm text-gray-500">Merci pour votre patience.</p>
          </div>
        </main>
      </body>
    </html>
  );
}
