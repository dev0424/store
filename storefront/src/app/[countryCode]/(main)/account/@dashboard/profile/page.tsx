import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRegion } from "@lib/data/regions";
import { retrieveCustomer } from "@lib/data/customer";
import { Divider } from "@medusajs/ui";
import VatNumberForm from "@modules/account/components/profile-customer/vat-number";
import SiretNumberForm from "@modules/account/components/profile-customer/siret-number";
import ApeCodeForm from "@modules/account/components/profile-customer/ape-code";
import InvoiceEmailForm from "@modules/account/components/profile-customer/invoice-email";
import RevenuePreviousYearForm from "@modules/account/components/profile-customer/revenue-previous-year";
import EmployeeCountForm from "@modules/account/components/profile-customer/employee-count";
import ActivityForm from "@modules/account/components/profile-customer/activity";
import { getActivities } from "@lib/data/activities";
import { getCustomPaymentMethods } from "@lib/data/custom-payment-methods";
import { getBillingCycles } from "@lib/data/billing-cycle";
import BillingCycleForm from "@modules/account/components/profile-customer/billing-cycle";
import PaymentMethodForm from "@modules/account/components/profile-customer/payment-method";

export const metadata: Metadata = {
  title: "Informations administratives",
  description:
    "Renseignez les informations légales, fiscales et de facturation de votre entreprise.",
};

export default async function Profile(props: {
  params: Promise<{ countryCode: string }>;
}) {
  const params = await props.params;
  const { countryCode } = params;
  const customer = await retrieveCustomer();
  const region = await getRegion(countryCode);
  const activities = await getActivities();
  const paymentMethods = await getCustomPaymentMethods();
  const billingCycles = await getBillingCycles();

  if (!customer || !region) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Informations administratives</h1>
        <p className="text-base-regular">
          Renseignez les informations légales, fiscales et de facturation de
          votre entreprise.
        </p>
      </div>
      <div className="flex w-full flex-col gap-y-8">
        <VatNumberForm value={customer.customer_profile.vat_number} />
        <Divider />
        <SiretNumberForm value={customer.customer_profile.siret_number} />
        <Divider />
        <ApeCodeForm value={customer.customer_profile.ape_code} />
        <Divider />
        <InvoiceEmailForm value={customer.customer_profile.invoice_email} />
        <Divider />
        <RevenuePreviousYearForm
          value={customer.customer_profile.revenue_previous_year}
        />
        <Divider />
        <EmployeeCountForm value={customer.customer_profile.employee_count} />
        <Divider />
        <ActivityForm
          activities={activities}
          value={customer.customer_profile.activity}
        />
        <Divider />
        <BillingCycleForm
          billingCycles={billingCycles}
          value={customer.customer_profile.billing_cycle}
        />
        <Divider />
        <PaymentMethodForm
          paymentMethods={paymentMethods}
          value={customer.customer_profile.payment_method}
        />
      </div>
    </div>
  );
}
