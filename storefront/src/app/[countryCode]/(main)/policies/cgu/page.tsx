import React from "react";

const CGU = () => {
  return (
    <section className="content-container flex flex-col gap-8 py-8 sm:py-16">
      <h1 className="text-2xl-semi text-center">
        Conditions Générales d’Utilisation (CGU)
      </h1>
      <p className="text-center italic text-ui-fg-subtle">
        En vigueur au 28 novembre 2025
      </p>
      <ul className="flex flex-col gap-4">
        <li>
          <h2 className="font-bold">1. Objet</h2>
          <p className="text-ui-fg-subtle">
            Les présentes Conditions Générales d’Utilisation (CGU) déterminent
            les modalités d’accès et d’utilisation du site internet édité par
            RSPI. L’accès et l’utilisation du Site impliquent l’acceptation sans
            réserve des présentes CGU.
          </p>
        </li>
        <li>
          <h2 className="font-bold">2. Définitions</h2>
          <div className="grid grid-cols-[auto_1fr] gap-x-8">
            <p className="text-ui-fg-subtle">Site:</p>
            <p className="text-ui-fg-subtle">
              le site internet exploité par RSPI.
            </p>
            <p className="text-ui-fg-subtle">Utilisateur:</p>
            <p className="text-ui-fg-subtle">
              toute personne naviguant ou utilisant les services proposés sur le
              Site.
            </p>
            <p className="text-ui-fg-subtle">Contenu:</p>
            <p className="text-ui-fg-subtle">
              l’ensemble des éléments disponibles sur le Site (textes, images,
              vidéos, données, etc.).
            </p>
          </div>
        </li>
        <li>
          <h2 className="font-bold">3. Accès au Site / Services</h2>
          <p className="text-ui-fg-subtle">
            L’accès au Site est libre, sauf pour certaines fonctionnalités
            pouvant nécessiter un compte. L’Utilisateur s’engage à n’utiliser le
            Site qu’à des fins légales et conformes aux CGU.
          </p>
        </li>
        <li>
          <h2 className="font-bold">4. Contenu / Propriété intellectuelle</h2>
          <p className="text-ui-fg-subtle">
            Le contenu du Site est protégé par le droit de la propriété
            intellectuelle. Toute reproduction, représentation, modification ou
            exploitation sans autorisation écrite de RSPI est interdite.
          </p>
        </li>
        <li>
          <h2 className="font-bold">
            5. Responsabilité &amp; Limitation de responsabilité
          </h2>
          <p className="text-ui-fg-subtle">
            RSPI s’efforce d’assurer une information fiable mais ne garantit pas
            l’absence d’erreurs. RSPI ne pourra être tenue responsable des
            dommages directs ou indirects résultant de l’utilisation du Site.
          </p>
        </li>
        <li>
          <h2 className="font-bold">6. Données personnelles &amp; Cookies</h2>
          <p className="text-ui-fg-subtle">
            RSPI s’engage à respecter le RGPD. Une politique de confidentialité
            détaillera les modalités de traitement des données et l’usage des
            cookies.
          </p>
        </li>
        <li>
          <h2 className="font-bold">
            7. Comportement de l’utilisateur / Interdictions
          </h2>
          <p className="text-ui-fg-subtle">
            L’Utilisateur s’interdit tout acte nuisant au bon fonctionnement du
            Site : intrusion, virus, diffusion de contenus illicites, atteinte
            aux droits de tiers. En cas de non-respect, RSPI pourra restreindre
            ou supprimer l’accès au Site.
          </p>
        </li>
        <li>
          <h2 className="font-bold">
            8. Modifications &amp; Maintenance du Site
          </h2>
          <p className="text-ui-fg-subtle">
            RSPI peut modifier, suspendre ou interrompre l’accès au Site pour
            maintenance ou évolution technique, sans indemnisation.
          </p>
        </li>
        <li>
          <h2 className="font-bold">
            9. Liens hypertextes &amp; Responsabilité
          </h2>
          <p className="text-ui-fg-subtle">
            Le Site peut contenir des liens externes dont RSPI n’est pas
            responsable, tant pour le contenu que la disponibilité.
          </p>
        </li>
        <li>
          <h2 className="font-bold">10. Droit applicable &amp; Litiges</h2>
          <p className="text-ui-fg-subtle">
            Les présentes CGU sont régies par le droit français. Tout litige
            sera soumis aux tribunaux du ressort du siège social de RSPI après
            tentative de résolution amiable.
          </p>
        </li>
        <li>
          <h2 className="font-bold">11. Acceptation des CGU</h2>
          <p className="text-ui-fg-subtle">
            L’utilisation du Site implique l’acceptation pleine et entière des
            présentes CGU.
          </p>
        </li>
      </ul>
    </section>
  );
};

export default CGU;
