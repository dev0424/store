import React from "react";

const CGV = () => {
  return (
    <section className="content-container flex flex-col gap-8 py-8 sm:py-16">
      <h1 className="text-2xl-semi text-center">
        Conditions Générales de Vente (CGV)
      </h1>
      <p className="text-center italic text-ui-fg-subtle">
        En vigueur au 28 novembre 2025
      </p>
      <div className="text-ui-fg-subtle">
        <p>RSPI – ROCK SOLUTIONS PRO INDUSTRIE</p>
        <p>SAS au capital de 1000 €</p>
        <div className="grid grid-cols-[auto_1fr] gap-x-8">
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
      </div>
      <ul className="flex flex-col gap-4">
        <li>
          <h2 className="font-bold">1. Objet et champ d’application</h2>
          <p className="text-ui-fg-subtle">
            Les présentes Conditions Générales de Vente (CGV) s’appliquent à
            l’ensemble des ventes de matériels, fournitures, équipements, pièces
            techniques et prestations proposées par RSPI à ses clients
            professionnels. Toute commande implique l’acceptation sans réserve
            des présentes CGV.
          </p>
        </li>
        <li>
          <h2 className="font-bold">2. Documents contractuels</h2>
          <p className="text-ui-fg-subtle">
            Le contrat est constitué par : (1) le devis accepté, (2) les
            présentes CGV, (3) la facture, (4) les documents techniques
            éventuels.
          </p>
        </li>
        <li>
          <h2 className="font-bold">3. Offres, devis et commandes</h2>
          <p className="text-ui-fg-subtle">
            Les devis sont valables 30 jours. La commande devient ferme après
            acceptation écrite et, si applicable, encaissement d’un acompte.
            RSPI peut refuser une commande en cas d’incident de paiement
            antérieur.
          </p>
        </li>
        <li>
          <h2 className="font-bold">4. Prix</h2>
          <p className="text-ui-fg-subtle">
            Les prix sont exprimés hors taxes et hors frais annexes, sauf
            indication contraire. Ils peuvent évoluer selon les coûts
            fournisseurs et matières premières.
          </p>
        </li>
        <li>
          <h2 className="font-bold">5. Conditions de paiement</h2>
          <p className="text-ui-fg-subtle">
            Les paiements s’effectuent par virement, chèque ou tout moyen
            accepté. En cas de retard : pénalités légales + indemnité
            forfaitaire de 40 €.
          </p>
        </li>
        <li>
          <h2 className="font-bold">6. Livraison – Transport</h2>
        </li>
        <li>
          <h2 className="font-bold">6.1 Délais : donnés à titre indicatif.</h2>
        </li>
        <li>
          <h2 className="font-bold">6.2 Transport</h2>
          <p className="text-ui-fg-subtle">
            Les marchandises voyagent aux risques du Client, sauf si le
            transporteur est mandaté par RSPI. Dans ce cas, RSPI assume la
            responsabilité du transport jusqu’à la remise au Client.
          </p>
        </li>
        <li>
          <h2 className="font-bold">6.3 Réception</h2>
          <p className="text-ui-fg-subtle">
            Le Client doit vérifier les marchandises et émettre des réserves
            précises en cas d’anomalie.
          </p>
        </li>
        <li>
          <h2 className="font-bold">7. Garantie et conformité</h2>
          <p className="text-ui-fg-subtle">
            RSPI applique les garanties légales et transmet les garanties
            fabricants. Sont exclues : mauvaise installation, usage non
            conforme, modifications du produit, usure normale.
          </p>
        </li>
        <li>
          <h2 className="font-bold">8. Retour de marchandises</h2>
          <p className="text-ui-fg-subtle">
            Aucun retour sans accord écrit préalable. Produits à retourner en
            parfait état et emballage d’origine. Aucun frais de remise en stock
            n’est appliqué.
          </p>
        </li>
        <li>
          <h2 className="font-bold">9. Responsabilité</h2>
          <p className="text-ui-fg-subtle">
            La responsabilité de RSPI est limitée au montant de la commande.
            Aucun dommage indirect n’est pris en charge.
          </p>
        </li>
        <li>
          <h2 className="font-bold">10. Propriété intellectuelle</h2>
          <p className="text-ui-fg-subtle">
            Documents, images et contenus RSPI ne peuvent être reproduits sans
            autorisation.
          </p>
        </li>
        <li>
          <h2 className="font-bold">11. Force majeure</h2>
          <p className="text-ui-fg-subtle">
            RSPI n&#39;est pas responsable en cas d’événement extérieur
            imprévisible empêchant l’exécution du contrat.
          </p>
        </li>
        <li>
          <h2 className="font-bold">12. Données personnelles</h2>
          <p className="text-ui-fg-subtle">
            Les données Client sont utilisées pour la gestion commerciale.
            Droits RGPD applicables.
          </p>
        </li>
        <li>
          <h2 className="font-bold">13. Clause de réserve de propriété</h2>
          <p className="text-ui-fg-subtle">
            Les marchandises restent la propriété de RSPI jusqu’au paiement
            intégral.
          </p>
        </li>
        <li>
          <h2 className="font-bold">14. Litiges</h2>
          <p className="text-ui-fg-subtle">
            Compétence exclusive des tribunaux du ressort du siège social de
            RSPI.
          </p>
        </li>
        <li>
          <h2 className="font-bold">15. Acceptation</h2>
          <p className="text-ui-fg-subtle">
            Toute commande vaut acceptation sans réserve des présentes CGV.
          </p>
        </li>
      </ul>
    </section>
  );
};

export default CGV;
