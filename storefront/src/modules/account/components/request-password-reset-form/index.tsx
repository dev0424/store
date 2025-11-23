"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { sdk } from "../../../../lib/config";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import Input from "@modules/common/components/input";
import { toast, Toaster } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

function RequestPasswordResetForm() {
  const [email, setEmail] = useState("");

  const onChangeEmail = async (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await sdk.auth.resetPassword("customer", "emailpass", {
        identifier: email,
      });
      toast.success("Success", {
        description:
          "Si un compte existe avec l’adresse e-mail indiquée, il recevra les instructions pour réinitialiser le mot de passe",
      });
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description:
          "La réinitialisation du mot de passe n’a pas pu être effectuée",
      });
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center">
      <h1 className="text-xl-semi text-center text-ui-fg-base sm:text-left">
        Réinitialisez votre mot de passe
      </h1>
      <p className="mb-8 text-center text-ui-fg-subtle">
        Réinitialisez votre mot de passe pour accéder de nouveau à votre compte.
      </p>
      <form onSubmit={handleSubmit} className="w-full">
        <Toaster />
        <Input
          label="Email"
          name="email"
          type="email"
          required={true}
          value={email}
          onChange={onChangeEmail}
        />
        <SubmitButton className="mt-6 h-10 w-full font-sans font-bold tracking-wide shadow-none">
          Réinitialiser le mot de passe
        </SubmitButton>
      </form>
      <span className="text-small-regular mt-6 text-center text-ui-fg-base">
        Vous avez déjà un compte?{" "}
        <LocalizedClientLink href="/account">
          <button className="underline">Se connecter</button>
        </LocalizedClientLink>
      </span>
    </div>
  );
}

export default RequestPasswordResetForm;
