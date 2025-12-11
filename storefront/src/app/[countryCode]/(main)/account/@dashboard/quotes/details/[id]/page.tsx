import { retrieveOrder } from "@lib/data/orders";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import QuoteDetailsTemplate from "@modules/quote/templates/quote-details-template";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const quote = await retrieveOrder(params.id);

  if (!quote) {
    notFound();
  }

  return {
    title: `Devis #${quote.display_id}`,
    description: `Consultez votre devis.`,
  };
}

export default async function QuoteDetailPage(props: Props) {
  const params = await props.params;
  const quote = await retrieveOrder(params.id);

  if (!quote) {
    notFound();
  }

  return <QuoteDetailsTemplate quote={quote} />;
}
