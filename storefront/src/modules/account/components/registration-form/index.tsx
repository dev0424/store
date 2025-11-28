"use client";

import React from "react";
import Input from "@modules/common/components/input";
import ErrorMessage from "@modules/checkout/components/error-message";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { signup } from "@lib/data/signup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BankAccount } from "@types/bank-account";
import { CustomerProfile } from "@types/customer-profile";
import NativeSelect from "@modules/common/components/native-select";
import { useRouter } from "next/navigation";
import { StoreCustomerAddress, StoreRegion } from "@medusajs/types";
import Checkbox from "@modules/common/components/checkbox";
import { SIGN_UP_SCHEMA } from "@modules/account/components/registration-form/schema";
import CountrySelect from "@modules/checkout/components/country-select";
import { Activity } from "@types/activity";
import { CustomPaymentMethod } from "@types/custom-payment-method";
import { BillingCycle } from "@types/billing-cycle";

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
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormValues>();

  const password = watch("password");

  const toggleAccepted = () => setAccepted((prevState) => !prevState);

  const onSubmit = async (data: RegistrationFormValues) => {
    const formData = {
      ...data,
      addresses: [
        {
          ...data.address,
          is_default_shipping: true,
          is_default_billing: true,
        },
      ],
    };

    const message = await signup(formData);

    if (message) {
      setError(message);
    } else {
      router.push("/account");
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-2">
          <p>Informations client</p>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                {...register("first_name", SIGN_UP_SCHEMA.first_name)}
                label="Prénom"
                name="first_name"
                autoComplete="given-name"
                data-testid="first-name-input"
                errors={errors?.first_name}
                required={true}
                disableNativeValidation={true}
              />
              <Input
                {...register("last_name", SIGN_UP_SCHEMA.last_name)}
                label="Nom"
                name="last_name"
                autoComplete="family-name"
                data-testid="last-name-input"
                errors={errors?.last_name}
                required={true}
                disableNativeValidation={true}
              />
              <Input
                {...register("email", SIGN_UP_SCHEMA.email)}
                label="Email"
                name="email"
                autoComplete="email"
                data-testid="email-input"
                errors={errors?.email}
                required={true}
                disableNativeValidation={true}
              />
              <Input
                {...register("phone", SIGN_UP_SCHEMA.phone)}
                label="Téléphone"
                name="phone"
                type="tel"
                autoComplete="tel"
                data-testid="phone-input"
                errors={errors?.phone}
                required={true}
                disableNativeValidation={true}
              />
              <Input
                {...register("company_name", SIGN_UP_SCHEMA.company_name)}
                label="Raison sociale"
                name="company_name"
                data-testid="company-name-input"
                type="text"
                errors={errors?.company_name}
                required={true}
                disableNativeValidation={true}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                {...register("password", SIGN_UP_SCHEMA.password)}
                label="Mot de passe"
                name="password"
                type="password"
                autoComplete="new-password"
                data-testid="password-input"
                errors={errors?.password}
                required={true}
                disableNativeValidation={true}
              />
              <Input
                {...register("confirm_password", {
                  required: "Ce champ est obligatoire",
                  validate: (value) =>
                    value === password ||
                    "Les mots de passe ne correspondent pas",
                })}
                label="Confirmez le mot de passe"
                name="confirm_password"
                type="password"
                autoComplete="new-password"
                data-testid="confirm-password-input"
                errors={errors?.confirm_password}
                required={true}
                disableNativeValidation={true}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p>Informations bancaires</p>
          <div className="grid grid-cols-2 gap-4">
            <Input
              {...register(
                "bank_account.bank_name",
                SIGN_UP_SCHEMA.bank_account.bank_name,
              )}
              label="Nom de la banque"
              name="bank_account.bank_name"
              errors={errors?.bank_account?.bank_name}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "bank_account.bank_code",
                SIGN_UP_SCHEMA.bank_account.bank_code,
              )}
              label="Code banque"
              name="bank_account.bank_code"
              errors={errors?.bank_account?.bank_code}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "bank_account.branch_code",
                SIGN_UP_SCHEMA.bank_account.branch_code,
              )}
              label="Code guichet"
              name="bank_account.branch_code"
              errors={errors?.bank_account?.branch_code}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "bank_account.city",
                SIGN_UP_SCHEMA.bank_account.city,
              )}
              label="Ville de la banque"
              name="bank_account.city"
              errors={errors?.bank_account?.city}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "bank_account.address",
                SIGN_UP_SCHEMA.bank_account.address,
              )}
              label="Domiciliation"
              name="bank_account.address"
              errors={errors?.bank_account?.address}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "bank_account.account_number",
                SIGN_UP_SCHEMA.bank_account.account_holder,
              )}
              label="N° du compte"
              name="bank_account.account_number"
              errors={errors?.bank_account?.account_number}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "bank_account.account_holder",
                SIGN_UP_SCHEMA.bank_account.account_holder,
              )}
              label="Titulaire du compte"
              name="bank_account.account_holder"
              errors={errors?.bank_account?.account_holder}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "bank_account.iban",
                SIGN_UP_SCHEMA.bank_account.iban,
              )}
              label="IBAN"
              name="bank_account.iban"
              errors={errors?.bank_account?.iban}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register("bank_account.bic", SIGN_UP_SCHEMA.bank_account.bic)}
              label="BIC"
              name="bank_account.bic"
              errors={errors?.bank_account?.bic}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "bank_account.rib_key",
                SIGN_UP_SCHEMA.bank_account.rib_key,
              )}
              label="Clé RIB"
              name="bank_account.rib_key"
              errors={errors?.bank_account?.rib_key}
              required={true}
              disableNativeValidation={true}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p>Adresse</p>
          <div className="grid grid-cols-2 gap-4">
            <Input
              {...register(
                "address.address_1",
                SIGN_UP_SCHEMA.address.address_1,
              )}
              label="N° et Nom de rue"
              name="address.address_1"
              errors={errors?.address?.address_1}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "address.address_2",
                SIGN_UP_SCHEMA.address.address_2,
              )}
              label="Adresse 2"
              name="address.address_2"
              errors={errors?.address?.address_2}
              required={false}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "address.postal_code",
                SIGN_UP_SCHEMA.address.postal_code,
              )}
              label="Code postal"
              name="address.postal_code"
              errors={errors?.address?.postal_code}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register("address.city", SIGN_UP_SCHEMA.address.city)}
              label="Ville"
              name="address.city"
              errors={errors?.address?.city}
              required={true}
              disableNativeValidation={true}
            />
            <CountrySelect
              {...register(
                "address.country_code",
                SIGN_UP_SCHEMA.address.country_code,
              )}
              name="address.country_code"
              region={region}
              errors={errors?.address?.country_code}
              autoComplete="country"
              defaultValue={""}
              data-testid="country-select"
            />
            <Input
              {...register("address.province", SIGN_UP_SCHEMA.address.province)}
              label="Province"
              name="address.province"
              errors={errors?.address?.province}
              required={false}
              disableNativeValidation={true}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p>Administratif</p>
          <div className="grid grid-cols-2 gap-4">
            <Input
              {...register(
                "customer_profile.vat_number",
                SIGN_UP_SCHEMA.customer_profile.vat_number,
              )}
              label="N° TVA Intracommunautaire"
              name="customer_profile.vat_number"
              errors={errors?.customer_profile?.vat_number}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "customer_profile.siret_number",
                SIGN_UP_SCHEMA.customer_profile.siret_number,
              )}
              label="SIRET"
              name="customer_profile.siret_number"
              errors={errors?.customer_profile?.siret_number}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "customer_profile.ape_code",
                SIGN_UP_SCHEMA.customer_profile.ape_code,
              )}
              label="Code APE"
              name="customer_profile.ape_code"
              errors={errors?.customer_profile?.ape_code}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "customer_profile.invoice_email",
                SIGN_UP_SCHEMA.customer_profile.invoice_email,
              )}
              label="Adresse e-mail de facturation"
              name="customer_profile.invoice_email"
              errors={errors?.customer_profile?.invoice_email}
              required={true}
              disableNativeValidation={true}
            />
            <NativeSelect
              {...register(
                "customer_profile.activity",
                SIGN_UP_SCHEMA.customer_profile.activity,
              )}
              name="customer_profile.activity"
              errors={errors?.customer_profile?.activity}
              placeholder="Activité"
              defaultValue={""}
            >
              {activities?.map((activity) => (
                <option key={activity.id} value={activity.name}>
                  {activity.name}
                </option>
              ))}
            </NativeSelect>
            <NativeSelect
              {...register(
                "customer_profile.billing_cycle",
                SIGN_UP_SCHEMA.customer_profile.billing_cycle,
              )}
              name="customer_profile.billing_cycle"
              errors={errors?.customer_profile?.billing_cycle}
              placeholder="Facturation"
              defaultValue={""}
            >
              {billingCycles?.map((billingCycle) => (
                <option key={billingCycle.id} value={billingCycle.name}>
                  {billingCycle.name}
                </option>
              ))}
            </NativeSelect>
            <NativeSelect
              {...register(
                "customer_profile.payment_method",
                SIGN_UP_SCHEMA.customer_profile.payment_method,
              )}
              name="customer_profile.payment_method"
              errors={errors?.customer_profile?.payment_method}
              placeholder="Mode de Règlement"
              defaultValue={""}
            >
              {paymentMethods?.map((paymentMethod) => (
                <option key={paymentMethod.id} value={paymentMethod.name}>
                  {paymentMethod.name}
                </option>
              ))}
            </NativeSelect>
          </div>
        </div>
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
            et consens au traitement de mes données personnelles conformément au
            RGPD.
          </span>
        }
        id="gdpr_consent"
        name="gdpr_consent"
        checked={accepted}
        onChange={toggleAccepted}
      />
      <SubmitButton
        disabled={!accepted}
        className="mt-6 h-10 w-full font-sans font-bold tracking-wide shadow-none"
        data-testid="register-button"
      >
        Envoyer
      </SubmitButton>
    </form>
  );
};

export default RegistrationForm;
