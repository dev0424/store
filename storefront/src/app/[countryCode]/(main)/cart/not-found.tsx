import { Metadata } from "next";

import InteractiveLink from "@modules/common/components/interactive-link";

export const metadata: Metadata = {
  title: "404",
  description: "Page non trouvée",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center">
      <h1 className="text-2xl-semi text-ui-fg-base">Page non trouvée</h1>
      <p className="text-small-regular text-ui-fg-base">
        Le panier auquel vous avez essayé d’accéder n’existe pas. Effacez vos
        cookies et réessayez.
      </p>
      <InteractiveLink href="/">Aller à la page d’accueil</InteractiveLink>
    </div>
  );
}
