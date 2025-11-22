import InteractiveLink from "@modules/common/components/interactive-link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "Page non trouvée.",
};

export default async function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-4">
      <h1 className="text-2xl-semi text-ui-fg-base">Page non trouvée</h1>
      <p className="text-small-regular text-ui-fg-base">
        La page que vous avez tenté d’ouvrir n’existe pas.
      </p>
      <InteractiveLink href="/">Aller à la page d’accueil</InteractiveLink>
    </div>
  );
}
