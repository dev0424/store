import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRegion } from "@lib/data/regions";
import { retrieveCustomer } from "@lib/data/customer";
import BankNameForm from "@modules/account/components/profile-bank-account/bank-name";
import { Divider } from "@medusajs/ui";
import BankCodeForm from "@modules/account/components/profile-bank-account/bank-code";
import BranchCodeForm from "@modules/account/components/profile-bank-account/branch-code";
import CityForm from "@modules/account/components/profile-bank-account/city";
import AddressForm from "@modules/account/components/profile-bank-account/address";
import AccountNumberForm from "@modules/account/components/profile-bank-account/account-number";
import AccountHolderForm from "@modules/account/components/profile-bank-account/account-holder";
import IbanForm from "@modules/account/components/profile-bank-account/iban";
import BicForm from "@modules/account/components/profile-bank-account/bic";
import RibKeyForm from "@modules/account/components/profile-bank-account/rib-key";

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

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Compte bancaire</h1>
        <p className="text-base-regular">
          Consultez et mettez à jour les informations de votre compte bancaire.
        </p>
      </div>
      <div className="flex w-full flex-col gap-y-8">
        <BankNameForm value={customer.bank_account.bank_name} />
        <Divider />
        <BankCodeForm value={customer.bank_account.bank_code} />
        <Divider />
        <BranchCodeForm value={customer.bank_account.branch_code} />
        <Divider />
        <CityForm value={customer.bank_account.city} />
        <Divider />
        <AddressForm value={customer.bank_account.address} />
        <Divider />
        <AccountNumberForm value={customer.bank_account.account_number} />
        <Divider />
        <AccountHolderForm value={customer.bank_account.account_holder} />
        <Divider />
        <IbanForm value={customer.bank_account.iban} />
        <Divider />
        <BicForm value={customer.bank_account.bic} />
        <Divider />
        <RibKeyForm value={customer.bank_account.rib_key} />
      </div>
    </div>
  );
}
