import { Heading, Text } from "@medusajs/ui";

import InteractiveLink from "@modules/common/components/interactive-link";

const EmptyCartMessage = () => {
  return (
    <div
      className="flex flex-col items-start justify-center px-2 py-48"
      data-testid="empty-cart-message"
    >
      <Heading
        level="h1"
        className="text-3xl-regular flex flex-row items-baseline gap-x-2"
      >
        Panier
      </Heading>
      <Text className="text-base-regular mb-6 mt-4 max-w-[32rem]">
        Votre panier est vide. Utilisez le lien ci-dessous pour parcourir nos
        produits.
      </Text>
      <div>
        <InteractiveLink href="/store">Découvrez nos produits</InteractiveLink>
      </div>
    </div>
  );
};

export default EmptyCartMessage;
