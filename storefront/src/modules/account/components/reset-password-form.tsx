"use client";

import React from "react";
import { sdk } from "../../../lib/config";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import Input from "@modules/common/components/input";
import { toast, Toaster } from "@medusajs/ui";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PASSWORD_SCHEMA } from "@modules/account/components/registration-form/schema";

type ResetPasswordFormValues = {
  confirm_password: string;
  password: string;
};

function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const password = watch("password");

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      return;
    }

    try {
      await sdk.auth.updateProvider(
        "customer",
        "emailpass",
        {
          email,
          password: data.password,
        },
        token,
      );
      router.replace("/account");
      toast.success("Success", {
        description: "Mot de passe réinitialisé avec succès",
      });
    } catch (error: any) {
      console.error(error);
      toast.error("Error", {
        description: "Échec de la réinitialisation du mot de passe",
      });
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center">
      <Toaster />
      <h1 className="text-xl-semi text-center text-ui-fg-base sm:text-left">
        Créer un nouveau mot de passe
      </h1>
      <p className="mb-8 text-center text-ui-fg-subtle">
        Veuillez saisir un nouveau mot de passe pour votre compte.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <Input
          {...register("password", PASSWORD_SCHEMA)}
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
              value === password || "Les mots de passe ne correspondent pas",
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
        <SubmitButton className="mt-6 h-10 w-full font-sans font-bold tracking-wide shadow-none">
          Réinitialiser le mot de passe
        </SubmitButton>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
