"use client";

import React from "react";
import Input from "@modules/common/components/input";
import ErrorMessage from "@modules/checkout/components/error-message";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { signup } from "@lib/data/signup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signupSchema } from "@modules/account/components/registration-form/schema";
import { BankAccount } from "@types/bank-account";
import { BillingAddress } from "@types/billing-address";
import { CustomerProfile } from "@types/customer-profile";
import NativeSelect from "@modules/common/components/native-select";
import { useRouter } from "next/navigation";

export type RegistrationFormValues = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  company_name: string;
  password: string;
  confirm_password: string;
  bank_account: BankAccount;
  billing_address: BillingAddress;
  customer_profile: CustomerProfile;
};

const RegistrationForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormValues>();

  const password = watch("password");

  const onSubmit = async (data: RegistrationFormValues) => {
    const message = await signup(data);

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
          <p>User information</p>
          <div className="grid grid-cols-2 gap-4">
            <Input
              {...register("first_name", signupSchema.first_name)}
              label="First name"
              name="first_name"
              autoComplete="given-name"
              data-testid="first-name-input"
              errors={errors?.first_name}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register("last_name", signupSchema.last_name)}
              label="Last name"
              name="last_name"
              autoComplete="family-name"
              data-testid="last-name-input"
              errors={errors?.last_name}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register("email", signupSchema.email)}
              label="Email"
              name="email"
              autoComplete="email"
              data-testid="email-input"
              errors={errors?.email}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register("phone", signupSchema.phone)}
              label="Phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              data-testid="phone-input"
              errors={errors?.phone}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register("company_name", signupSchema.company_name)}
              label="Company name"
              name="company_name"
              data-testid="company-name-input"
              type="text"
              errors={errors?.company_name}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register("password", signupSchema.password)}
              label="Password"
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
              label="Confirm password"
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

        <div className="flex w-full flex-col gap-2">
          <p>Bank account</p>
          <div className="grid grid-cols-2 gap-4">
            <Input
              {...register(
                "bank_account.bank_name",
                signupSchema.bank_account.bank_name,
              )}
              label="Bank name"
              name="bank_account.bank_name"
              errors={errors?.bank_account?.bank_name}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "bank_account.bank_code",
                signupSchema.bank_account.bank_code,
              )}
              label="Bank code"
              name="bank_account.bank_code"
              errors={errors?.bank_account?.bank_code}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "bank_account.branch_code",
                signupSchema.bank_account.branch_code,
              )}
              label="Branch code"
              name="bank_account.branch_code"
              errors={errors?.bank_account?.branch_code}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register("bank_account.city", signupSchema.bank_account.city)}
              label="City"
              name="bank_account.city"
              errors={errors?.bank_account?.city}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "bank_account.address",
                signupSchema.bank_account.address,
              )}
              label="Address"
              name="bank_account.address"
              errors={errors?.bank_account?.address}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "bank_account.account_number",
                signupSchema.bank_account.account_holder,
              )}
              label="Account number"
              name="bank_account.account_number"
              errors={errors?.bank_account?.account_number}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "bank_account.account_holder",
                signupSchema.bank_account.account_holder,
              )}
              label="Account holder"
              name="bank_account.account_holder"
              errors={errors?.bank_account?.account_holder}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register("bank_account.iban", signupSchema.bank_account.iban)}
              label="IBAN"
              name="bank_account.iban"
              errors={errors?.bank_account?.iban}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register("bank_account.bic", signupSchema.bank_account.bic)}
              label="BIC"
              name="bank_account.bic"
              errors={errors?.bank_account?.bic}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "bank_account.rib_key",
                signupSchema.bank_account.rib_key,
              )}
              label="RIB key"
              name="bank_account.rib_key"
              errors={errors?.bank_account?.rib_key}
              required={true}
              disableNativeValidation={true}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p>Billing address</p>
          <div className="grid grid-cols-2 gap-4">
            <Input
              {...register(
                "billing_address.address_1",
                signupSchema.billing_address.address_1,
              )}
              label="Address 1"
              name="billing_address.address_1"
              errors={errors?.billing_address?.address_1}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "billing_address.address_2",
                signupSchema.billing_address.address_2,
              )}
              label="Address 2"
              name="billing_address.address_2"
              errors={errors?.billing_address?.address_2}
              required={false}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "billing_address.postal_code",
                signupSchema.billing_address.postal_code,
              )}
              label="Postal code"
              name="billing_address.postal_code"
              errors={errors?.billing_address?.postal_code}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "billing_address.city",
                signupSchema.billing_address.city,
              )}
              label="City"
              name="billing_address.city"
              errors={errors?.billing_address?.city}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "billing_address.country_code",
                signupSchema.billing_address.country_code,
              )}
              label="Country"
              name="billing_address.country_code"
              errors={errors?.billing_address?.country_code}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "billing_address.province",
                signupSchema.billing_address.province,
              )}
              label="Province"
              name="billing_address.province"
              errors={errors?.billing_address?.province}
              required={false}
              disableNativeValidation={true}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p>Customer profile</p>
          <div className="grid grid-cols-2 gap-4">
            <Input
              {...register(
                "customer_profile.vat_number",
                signupSchema.customer_profile.vat_number,
              )}
              label="VAT number"
              name="customer_profile.vat_number"
              errors={errors?.customer_profile?.vat_number}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "customer_profile.siret_number",
                signupSchema.customer_profile.siret_number,
              )}
              label="SIRET number"
              name="customer_profile.siret_number"
              errors={errors?.customer_profile?.siret_number}
              required={true}
              disableNativeValidation={true}
            />
            <Input
              {...register(
                "customer_profile.ape_code",
                signupSchema.customer_profile.ape_code,
              )}
              label="APE code"
              name="customer_profile.ape_code"
              errors={errors?.customer_profile?.ape_code}
              required={true}
              disableNativeValidation={true}
            />
            <NativeSelect
              {...register(
                "customer_profile.activity",
                signupSchema.customer_profile.activity,
              )}
              name="customer_profile.activity"
              errors={errors?.customer_profile?.activity}
            >
              <option value={"activity-1"}>Activity 1</option>
              <option value={"activity-1"}>Activity 2</option>
            </NativeSelect>
            <NativeSelect
              {...register(
                "customer_profile.billing_cycle",
                signupSchema.customer_profile.billing_cycle,
              )}
              name="customer_profile.billing_cycle"
              errors={errors?.customer_profile?.billing_cycle}
            >
              <option value={"billing-cycle-1"}>Billing cycle 1</option>
              <option value={"billing-cycle-2"}>Billing cycle 2</option>
            </NativeSelect>
            <NativeSelect
              {...register(
                "customer_profile.payment_method",
                signupSchema.customer_profile.payment_method,
              )}
              name="customer_profile.payment_method"
              errors={errors?.customer_profile?.payment_method}
              required
            >
              <option value={"payment-method-1"}>Payment method 1</option>
              <option value={"payment-method-2"}>Payment method 2</option>
            </NativeSelect>
            <Input
              {...register(
                "customer_profile.invoice_email",
                signupSchema.customer_profile.invoice_email,
              )}
              label="Invoice email"
              name="customer_profile.invoice_email"
              errors={errors?.customer_profile?.invoice_email}
              required={true}
              disableNativeValidation={true}
            />
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
        className="mt-6 w-full font-sans font-bold tracking-wide"
        data-testid="register-button"
      >
        Envoyer
      </SubmitButton>
    </form>
  );
};

export default RegistrationForm;
