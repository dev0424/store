import { Metadata } from "next";
import { notFound } from "next/navigation";

import AddressBook from "@modules/account/components/address-book";

import { getRegion } from "@lib/data/regions";
import { retrieveCustomer } from "@lib/data/customer";

export const metadata: Metadata = {
  title: "Addresses",
  description: "View your addresses",
};

export default async function Addresses(props: {
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
        <h1 className="text-2xl-semi">Shipping Addresses</h1>
        <p className="text-base-regular">
          View and update your shipping addresses, you can add as many as you
          like. Saving your addresses will make them available during checkout.
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
      <div>
        <p>Billing address</p>
        <p>Address 1: {customer.billing_address.address_1}</p>
        <p>Address 2: {customer.billing_address.address_2}</p>
        <p>Postal code: {customer.billing_address.postal_code}</p>
        <p>City: {customer.billing_address.city}</p>
        <p>Country: {customer.billing_address.country_code}</p>
        <p>Province: {customer.billing_address.province}</p>
      </div>
    </div>
  );
}
