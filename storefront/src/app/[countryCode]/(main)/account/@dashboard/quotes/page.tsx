import { Metadata } from "next";
import { notFound } from "next/navigation";
import { listOrders } from "@lib/data/orders";
import QuoteOverview from "@modules/account/components/quote-overview";

export const metadata: Metadata = {
  title: "Devis",
  description: "Aperçu de vos devis précédents.",
};

export default async function Orders() {
  const quotes = await listOrders({ is_draft_order: true });

  if (!quotes) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="quotes-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Devis</h1>
        <p className="text-base-regular">
          Consultez vos devis précédents et leur statut. Vous pouvez également
          accepter ou refuser les devis.
        </p>
      </div>
      <div>
        <QuoteOverview quotes={quotes} />
      </div>
    </div>
  );
}
