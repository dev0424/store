import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getRegion } from "@lib/data/regions";
import { retrieveCustomer } from "@lib/data/customer";

export const metadata: Metadata = {
  title: "Bank Account",
  description: "View your bank account",
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
        <h1 className="text-2xl-semi">Bank Account</h1>
        <p className="text-base-regular">
          View and update your bank account information.
        </p>
      </div>
      <p>Bank name: {customer.bank_account.bank_name}</p>
      <p>Bank code: {customer.bank_account.bank_code}</p>
      <p>Branch code: {customer.bank_account.branch_code}</p>
      <p>City: {customer.bank_account.city}</p>
      <p>Address: {customer.bank_account.address}</p>
      <p>Account number: {customer.bank_account.account_number}</p>
      <p>Account holder: {customer.bank_account.account_holder}</p>
      <p>Iban: {customer.bank_account.iban}</p>
      <p>BIC: {customer.bank_account.bic}</p>
      <p>RIB key: {customer.bank_account.rib_key}</p>
    </div>
  );
}
