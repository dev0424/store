import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRegion } from "@lib/data/regions";
import { retrieveCustomer } from "@lib/data/customer";
import { Divider } from "@medusajs/ui";
import CentralizedBillingForm from "@modules/account/components/account-group/centralized-billing";
import PurchasingGroupForm from "@modules/account/components/account-group/purchasing-group-member";
import AgencyBranchForm from "@modules/account/components/account-group/agency-branch";
import PlatformClientForm from "@modules/account/components/account-group/platform-client";
import CorporateStatusForm from "@modules/account/components/account-group/corporate-status";
import MembershipNumberForm from "@modules/account/components/account-group/membership-number";
import ParentGroupNameForm from "@modules/account/components/account-group/parent-group-name";
import PlatformNameForm from "@modules/account/components/account-group/platform-name";
import PurchasingGroupNameForm from "@modules/account/components/account-group/purchasing-group-name";

export const metadata: Metadata = {
  title: "Informations complémentaires",
  description:
    "Renseignez et mettez à jour les informations administratives de votre entreprise : facturation centralisée, statut juridique, appartenance à un groupe d’achat, agences, plateformes et identifiants associés.",
};

export default async function AccountGroup(props: {
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
        <h1 className="text-2xl-semi">Informations complémentaires</h1>
        <p className="text-base-regular">
          Renseignez et mettez à jour les informations administratives de votre
          entreprise : facturation centralisée, statut juridique, appartenance à
          un groupe d’achat, agences, plateformes et identifiants associés.
        </p>
      </div>
      <div className="flex w-full flex-col gap-y-8">
        <CentralizedBillingForm
          value={customer.account_group.is_centralized_billing}
        />
        <Divider />
        <CorporateStatusForm value={customer.account_group.corporate_status} />
        <Divider />
        <PurchasingGroupForm
          value={customer.account_group.is_purchasing_group_member}
        />
        <Divider />
        <PurchasingGroupNameForm
          value={customer.account_group.purchasing_group_name}
        />
        <Divider />
        <MembershipNumberForm
          value={customer.account_group.membership_number}
        />
        <Divider />
        <AgencyBranchForm value={customer.account_group.is_agency_or_branch} />
        <Divider />
        <ParentGroupNameForm value={customer.account_group.parent_group_name} />
        <Divider />
        <PlatformClientForm value={customer.account_group.is_platform_client} />
        <Divider />
        <PlatformNameForm value={customer.account_group.platform_name} />
      </div>
    </div>
  );
}
