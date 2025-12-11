import { retrieveOrder } from "@lib/data/orders";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import QuoteCompletedTemplate from "@modules/quote/templates/quote-completed-template";

type Props = {
  params: Promise<{ id: string }>;
};
export const metadata: Metadata = {
  title: "Devis confirmé",
  description: "Votre devis a été confirmé avec succès.",
};

export default async function QuoteConfirmedPage(props: Props) {
  const params = await props.params;
  const quote = await retrieveOrder(params.id);

  if (!quote) {
    return notFound();
  }

  return <QuoteCompletedTemplate quote={quote} />;
}
