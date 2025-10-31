"use client";

import Input from "@modules/common/components/input";
import ErrorMessage from "@modules/checkout/components/error-message";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { signup } from "@lib/data/company";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signupSchema } from "@modules/account/components/company-registration-form/schema";

export type SignupFormData = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  company_name: string;
  password: string;
  confirm_password: string;
  metadata: {
    tax_number: string;
  };
};

const CompanyRegistrationForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignupFormData) => {
    const message = await signup(data);

    if (message) {
      setError(message);
    }
  };

  return (
    <form className="flex w-full flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col gap-y-2">
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
          {...register("metadata.tax_number", signupSchema.metadata.tax_number)}
          label="Tax number"
          name="metadata.tax_number"
          data-testid="tax-number-input"
          type="text"
          errors={errors?.metadata?.tax_number}
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
            validate: (value) => value === password || "Passwords do not match",
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
      {error ? (
        <ErrorMessage error={error} data-testid="register-error" />
      ) : null}
      <span className="text-small-regular mt-6 text-center text-ui-fg-base">
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

export default CompanyRegistrationForm;
