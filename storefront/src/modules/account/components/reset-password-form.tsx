"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { sdk } from "../../../lib/config";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import Input from "@modules/common/components/input";
import { toast, Toaster } from "@medusajs/ui";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      return;
    }

    try {
      await sdk.auth.updateProvider(
        "customer",
        "emailpass",
        {
          email,
          password,
        },
        token,
      );
      setPassword("");
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
      <h1 className="text-xl-semi text-center text-ui-fg-base sm:text-left">
        Créer un nouveau mot de passe
      </h1>
      <p className="mb-8 text-center text-ui-fg-subtle">
        Veuillez saisir un nouveau mot de passe pour votre compte.
      </p>
      <form onSubmit={handleSubmit} className="w-full">
        <Toaster />
        <Input
          label="Mot de passe"
          name="password"
          type="password"
          required={true}
          value={password}
          onChange={onChangePassword}
        />
        <SubmitButton className="mt-6 h-10 w-full font-sans font-bold tracking-wide shadow-none">
          Réinitialiser le mot de passe
        </SubmitButton>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
