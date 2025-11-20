import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getRegion } from "@lib/data/regions";
import { retrieveCustomer } from "@lib/data/customer";

export const metadata: Metadata = {
  title: "Compte bancaire",
  description: "Consultez votre compte bancaire.",
};

export default async function BankAccount(props: {
  params: Promise<{ countryCode: string }>;
}) {
  const params = await props.params;
  const { countryCode } = params;
  const customer = await retrieveCustomer();
  const region = await getRegion(countryCode);

  if (!customer || !region) {
    notFound();
  }
  // TODO
  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Compte bancaire</h1>
        <p className="text-base-regular">
          Consultez et mettez à jour les informations de votre compte bancaire.
        </p>
      </div>
      <p>Nom de la banque: {customer.bank_account.bank_name}</p>
      <p>Code banque: {customer.bank_account.bank_code}</p>
      <p>Code guichet: {customer.bank_account.branch_code}</p>
      <p>Ville de la banque: {customer.bank_account.city}</p>
      <p>Domiciliation: {customer.bank_account.address}</p>
      <p>N° du compte: {customer.bank_account.account_number}</p>
      <p>Titulaire du compte: {customer.bank_account.account_holder}</p>
      <p>IBAN: {customer.bank_account.iban}</p>
      <p>BIC: {customer.bank_account.bic}</p>
      <p>Clé RIB: {customer.bank_account.rib_key}</p>
    </div>
  );
}
