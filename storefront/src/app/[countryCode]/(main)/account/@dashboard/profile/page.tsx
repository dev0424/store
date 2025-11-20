import { Metadata } from "next";

import ProfilePhone from "@modules/account//components/profile-phone";
import ProfileBillingAddress from "@modules/account/components/profile-billing-address";
import ProfileEmail from "@modules/account/components/profile-email";
import ProfileName from "@modules/account/components/profile-name";
import ProfilePassword from "@modules/account/components/profile-password";

import { notFound } from "next/navigation";
import { listRegions } from "@lib/data/regions";
import { retrieveCustomer } from "@lib/data/customer";

export const metadata: Metadata = {
  title: "Profil",
  description: "Consultez et modifiez votre profil RSPI.",
};

export default async function Profile() {
  const customer = await retrieveCustomer();
  const regions = await listRegions();

  if (!customer || !regions) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Profil</h1>
        <p className="text-base-regular">
          Consultez et mettez à jour les informations de votre profil, notamment
          votre nom, votre adresse e-mail et votre numéro de téléphone. Vous
          pouvez également modifier votre adresse de facturation ou vos
          coordonnées bancaires.
        </p>
      </div>
      <div className="flex w-full flex-col gap-y-8">
        <ProfileName customer={customer} />
        <Divider />
        <ProfileEmail customer={customer} />
        <Divider />
        <ProfilePhone customer={customer} />
        <Divider />
        {/* <ProfilePassword customer={customer} />
        <Divider /> */}
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  );
}

const Divider = () => {
  return <div className="h-px w-full bg-gray-200" />;
};
``;
