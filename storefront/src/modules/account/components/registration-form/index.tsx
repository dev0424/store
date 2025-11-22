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
import { HttpTypes } from "@medusajs/types";
import Checkbox from "@modules/common/components/checkbox";
import { getSignupSchema } from "@modules/account/components/registration-form/schema";
import { Label } from "@medusajs/ui";

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
  addresses: HttpTypes.StoreCustomerAddress[];
};

const RegistrationForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [billingSameAsShipping, setBillingSameAsShipping] =
    useState<boolean>(true);

  const SIGN_UP_SCHEMA = getSignupSchema(billingSameAsShipping);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    defaultValues: {
      addresses: [
        { address_name: "Shipping address" },
        { address_name: "Billing address" },
      ],
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegistrationFormValues) => {
    let addresses = [];

    if (billingSameAsShipping) {
      addresses.push({
        ...data.addresses[0],
        is_default_shipping: true,
        is_default_billing: true,
      });
    } else {
      addresses.push({
        ...data.addresses[0],
        is_default_shipping: true,
        is_default_billing: false,
      });

      addresses.push({
        ...data.addresses[1],
        is_default_shipping: false,
        is_default_billing: true,
      });
    }

    const formData = {
      ...data,
      addresses,
    };

    const message = await signup(formData);

    if (message) {
      setError(message);
    } else {
      router.push("/account");
    }
  };

  return (
    <form className="flex w-full flex-col" onSubmit={handleSubmit(onSubmit)}>
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
                  required: "This field is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
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
          <p>Adresse de livraison</p>
          <div className="grid grid-cols-2 gap-4">
            <Input
              {...register(
                "addresses.0.address_1",
                SIGN_UP_SCHEMA.addresses[0].address_1,
              )}
              label="N° et Nom de rue"
              name="addresses.0.address_1"
              errors={errors?.addresses?.[0]?.address_1}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "addresses.0.address_2",
                SIGN_UP_SCHEMA.addresses[0].address_2,
              )}
              label="Adresse 2"
              name="addresses.0.address_2"
              errors={errors?.addresses?.[0]?.address_2}
              required={false}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "addresses.0.postal_code",
                SIGN_UP_SCHEMA.addresses[0].postal_code,
              )}
              label="Code postal"
              name="addresses.0.postal_code"
              errors={errors?.addresses?.[0]?.postal_code}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "addresses.0.city",
                SIGN_UP_SCHEMA.addresses[0].city,
              )}
              label="Ville"
              name="addresses.0.city"
              errors={errors?.addresses?.[0]?.city}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "addresses.0.country_code",
                SIGN_UP_SCHEMA.addresses[0].country_code,
              )}
              label="Pays"
              name="addresses.0.country_code"
              errors={errors?.addresses?.[0]?.country_code}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "addresses.0.province",
                SIGN_UP_SCHEMA.addresses[0].province,
              )}
              label="Province"
              name="addresses.0.province"
              errors={errors?.addresses?.[0]?.province}
              required={false}
              disableNativeValidation={true}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p>Adresse de facturation</p>
          <Checkbox
            label="Adresse de facturation identique à l'adresse de livraison"
            name="same_as_billing"
            checked={billingSameAsShipping}
            onChange={() => setBillingSameAsShipping((prevState) => !prevState)}
          />
          {billingSameAsShipping ? null : (
            <div className="grid grid-cols-2 gap-4">
              <Input
                {...register(
                  "addresses.1.address_1",
                  SIGN_UP_SCHEMA.addresses[1].address_1,
                )}
                label="N° et Nom de rue"
                name="addresses.1.address_1"
                errors={errors?.addresses?.[1]?.address_1}
                required={true}
                disableNativeValidation={true}
              />
              <Input
                {...register(
                  "addresses.1.address_2",
                  SIGN_UP_SCHEMA.addresses[1].address_2,
                )}
                label="Adresse 2"
                name="addresses.1.address_2"
                errors={errors?.addresses?.[1]?.address_2}
                required={false}
                disableNativeValidation={true}
              />
              <Input
                {...register(
                  "addresses.1.postal_code",
                  SIGN_UP_SCHEMA.addresses[1].postal_code,
                )}
                label="Code postal"
                name="addresses.1.postal_code"
                errors={errors?.addresses?.[1]?.postal_code}
                required={true}
                disableNativeValidation={true}
              />
              <Input
                {...register(
                  "addresses.1.city",
                  SIGN_UP_SCHEMA.addresses[1].city,
                )}
                label="Ville"
                name="addresses.1.city"
                errors={errors?.addresses?.[1]?.city}
                required={true}
                disableNativeValidation={true}
              />
              <Input
                {...register(
                  "addresses.1.country_code",
                  SIGN_UP_SCHEMA.addresses[1].country_code,
                )}
                label="Pays"
                name="addresses.1.country_code"
                errors={errors?.addresses?.[1]?.country_code}
                required={true}
                disableNativeValidation={true}
              />
              <Input
                {...register(
                  "addresses.1.province",
                  SIGN_UP_SCHEMA.addresses[1].province,
                )}
                label="Province"
                name="addresses.1.province"
                errors={errors?.addresses?.[1]?.province}
                required={false}
                disableNativeValidation={true}
              />
            </div>
          )}
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
            <div>
              <Label className="txt-compact-small font-sans font-medium">
                Activité
              </Label>
              <NativeSelect
                {...register(
                  "customer_profile.activity",
                  SIGN_UP_SCHEMA.customer_profile.activity,
                )}
                name="customer_profile.activity"
                errors={errors?.customer_profile?.activity}
              >
                <option value={"activity-1"}>Activity 1</option>
                <option value={"activity-1"}>Activity 2</option>
              </NativeSelect>
            </div>
            <div>
              <Label className="txt-compact-small font-sans font-medium">
                Facturation
              </Label>
              <NativeSelect
                {...register(
                  "customer_profile.billing_cycle",
                  SIGN_UP_SCHEMA.customer_profile.billing_cycle,
                )}
                name="customer_profile.billing_cycle"
                errors={errors?.customer_profile?.billing_cycle}
              >
                <option value={"billing-cycle-1"}>Billing cycle 1</option>
                <option value={"billing-cycle-2"}>Billing cycle 2</option>
              </NativeSelect>
            </div>
            <div>
              <Label className="txt-compact-small font-sans font-medium">
                Mode de Règlement
              </Label>
              <NativeSelect
                {...register(
                  "customer_profile.payment_method",
                  SIGN_UP_SCHEMA.customer_profile.payment_method,
                )}
                name="customer_profile.payment_method"
                errors={errors?.customer_profile?.payment_method}
                required
              >
                <option value={"payment-method-1"}>Payment method 1</option>
                <option value={"payment-method-2"}>Payment method 2</option>
              </NativeSelect>
            </div>
          </div>
        </div>
      </div>
      {error ? (
        <ErrorMessage error={error} data-testid="register-error" />
      ) : null}
      <span className="text-small-regular mt-6 text-ui-fg-base">
        En créant un compte, vous acceptez{" "}
        <LocalizedClientLink href="#" className="underline">
          la Politique de confidentialité
        </LocalizedClientLink>{" "}
        et{" "}
        <LocalizedClientLink href="#" className="underline">
          les conditions d'utilisation du magasin
        </LocalizedClientLink>
        .
      </span>
      <SubmitButton
        className="mt-6 h-10 w-full font-sans font-bold tracking-wide shadow-none"
        data-testid="register-button"
      >
        Envoyer
      </SubmitButton>
    </form>
  );
};

export default RegistrationForm;
