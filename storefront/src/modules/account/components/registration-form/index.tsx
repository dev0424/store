"use client";

import React, { useTransition, useState } from "react";
import ErrorMessage from "@modules/checkout/components/error-message";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { signup } from "@lib/data/signup";
import { FormProvider, useForm } from "react-hook-form";
import { BankAccount } from "@types/bank-account";
import { CustomerProfile } from "@types/customer-profile";
import { useRouter } from "next/navigation";
import { StoreCustomerAddress, StoreRegion } from "@medusajs/types";
import Checkbox from "@modules/common/components/checkbox";
import { Activity } from "@types/activity";
import { CustomPaymentMethod } from "@types/custom-payment-method";
import { BillingCycle } from "@types/billing-cycle";
import { Divider } from "@medusajs/ui";
import ClientInfoSection from "@modules/account/components/registration-form/components/client-info";
import BankInfoSection from "@modules/account/components/registration-form/components/bank-info";
import AddressSection from "@modules/account/components/registration-form/components/address-info";
import AdministrativeSection from "@modules/account/components/registration-form/components/administrative-info";
import Documents from "@modules/account/components/registration-form/components/documents";
import AccountGroupSection from "@modules/account/components/registration-form/components/account-group";
import { AccountGroup } from "@types/account-group";
import { Contact } from "@types/contact";
import ContactsSection from "@modules/account/components/registration-form/components/contacts";

export type RegistrationFormValues = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  company_name: string;
  password: string;
  confirm_password: string;
  bank_account: BankAccount;
  customer_profile: CustomerProfile;
  address: StoreCustomerAddress;
  account_group: AccountGroup;
  contacts: Contact[];
  files: {
    rib: File;
    kbis: File;
  };
};

type Props = {
  region: StoreRegion | null | undefined;
  activities: Activity[] | undefined;
  paymentMethods: CustomPaymentMethod[] | undefined;
  billingCycles: BillingCycle[] | undefined;
};

const RegistrationForm = ({
  region,
  activities,
  paymentMethods,
  billingCycles,
}: Props) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const methods = useForm<RegistrationFormValues>();

  const toggleAccepted = () => setAccepted((prevState) => !prevState);

  const onSubmit = async (data: RegistrationFormValues) => {
    const formData = {
      ...data,
      addresses: [
        {
          ...data.address,
          company: data.company_name,
          first_name: data.first_name,
          last_name: data.last_name,
          is_default_shipping: true,
          is_default_billing: true,
        },
      ],
    };

    startTransition(async () => {
      const message = await signup(formData);

      if (message) {
        setError(message);
      } else {
        router.push("/account");
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col gap-6">
          <ClientInfoSection />
          <Divider />
          <BankInfoSection />
          <Divider />
          <AddressSection region={region} />
          <Divider />
          <AdministrativeSection
            paymentMethods={paymentMethods}
            billingCycles={billingCycles}
            activities={activities}
          />
          <Divider />
          <AccountGroupSection />
          <Divider />
          <ContactsSection />
          <Divider />
          <Documents />
        </div>
        {error ? (
          <ErrorMessage error={error} data-testid="register-error" />
        ) : null}
        <Checkbox
          label={
            <span>
              J’accepte les{" "}
              <LocalizedClientLink href="/policies/cgv" className="underline">
                Conditions Générales de Vente (CGV)
              </LocalizedClientLink>{" "}
              et les{" "}
              <LocalizedClientLink href="/policies/cgu" className="underline">
                Conditions Générales d’Utilisation (CGU)
              </LocalizedClientLink>
              {", "}
              et consens au traitement de mes données personnelles conformément
              au RGPD.
            </span>
          }
          id="gdpr_consent"
          name="gdpr_consent"
          checked={accepted}
          onChange={toggleAccepted}
        />
        <SubmitButton
          isLoading={isPending}
          disabled={!accepted}
          className="mt-6 h-10 w-full font-sans font-bold tracking-wide shadow-none"
          data-testid="register-button"
        >
          Envoyer
        </SubmitButton>
      </form>
    </FormProvider>
  );
};

export default RegistrationForm;
