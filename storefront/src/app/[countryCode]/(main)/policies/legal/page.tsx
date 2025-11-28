import React from "react";

const LegalPage = () => {
  return (
    <section className="content-container flex flex-col gap-8 py-8 sm:py-16">
      <h1 className="text-2xl-semi text-center">Mentions légales</h1>
      <p className="text-center italic text-ui-fg-subtle">
        En vigueur au 28 novembre 2025
      </p>
      <ul className="flex flex-col gap-4">
        <li>
          <h2 className="font-bold">Éditeur du site</h2>
          <div className="text-ui-fg-subtle">
            <p>RSPI ROCK SOLUTIONS PRO INDUSTRIE</p>
            <p>SAS au capital de 1000 €</p>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-8 text-ui-fg-subtle">
            <p>Siège social:</p>
            <p>185 Rue du Canton du Cailloutis, 59279 LOON-PLAGE</p>
            <p>SIREN:</p>
            <p>951 870 831</p>
            <p>Code APE:</p>
            <p>46.90Z – Commerce de gros non spécialisé</p>
            <p>Courriel:</p>
            <p>contact@rspi.fr</p>
            <p>Téléphone:</p>
            <p>+33 (0)6 51 01 83 00</p>
          </div>
        </li>
        <li>
          <h2 className="font-bold">Directeur de la publication</h2>
          <p className="text-ui-fg-subtle">Le représentant légal de RSPI.</p>
        </li>
        <li>
          <h2 className="font-bold">Hébergeur du site</h2>
          <p className="text-ui-fg-subtle">IONOS SARL</p>
          <p className="text-ui-fg-subtle">
            7 Place de la Gare, 57200 Sarreguemines, France
          </p>
          <div className="grid grid-cols-[auto_1fr] gap-x-8 text-ui-fg-subtle">
            <p>SIRET:</p>
            <p>431 303 775 00016</p>
            <p>Téléphone</p>
            <p>09 70 80 89 11</p>
          </div>
        </li>
        <li>
          <h2 className="font-bold">Propriété intellectuelle</h2>
          <p className="text-ui-fg-subtle">
            Les contenus du site (textes, images, vidéos, logos, etc.) sont
            protégés par le droit de la propriété intellectuelle. Toute
            reproduction ou utilisation sans autorisation est interdite.
          </p>
        </li>
        <li>
          <h2 className="font-bold">Données personelles et cookies</h2>
          <p className="text-ui-fg-subtle">
            RSPI s’engage à respecter la réglementation en vigueur concernant la
            protection des données personnelles. Une politique de
            confidentialité détaillera les modalités de traitement et l’usage
            des cookies.
          </p>
        </li>
        <li>
          <h2 className="font-bold">Conditions générales de vente</h2>
          <p className="text-ui-fg-subtle">
            RSPI s’engage à respecter la réglementation en vigueur concernant la
            protection des données personnelles. Une politique de
            confidentialité détaillera les modalités de traitement et l’usage
            des cookies.
          </p>
        </li>
        <li>
          <h2 className="font-bold">Litiges</h2>
          <p className="text-ui-fg-subtle">
            Tout litige relève des tribunaux compétents du ressort du siège
            social de RSPI.
          </p>
        </li>
        <li>
          <h2 className="font-bold">Acceptation</h2>
          <p className="text-ui-fg-subtle">
            L’utilisation du site implique l’acceptation des présentes mentions
            légales.
          </p>
        </li>
      </ul>
    </section>
  );
};

export default LegalPage;
